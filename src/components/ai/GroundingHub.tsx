import React, { useState } from 'react';
import {
  MapPin,
  Search,
  ExternalLink,
  Navigation,
  Compass,
  Building2,
  Store,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Info
} from 'lucide-react';
import { Language } from '../../types';
import { callMapsGrounding, callSearchGrounding } from '../../services/geminiClient';

interface GroundingHubProps {
  language: Language;
}

export const GroundingHub: React.FC<GroundingHubProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'maps' | 'search'>('maps');

  // Maps Grounding State
  const [mapsQuery, setMapsQuery] = useState('');
  const [mapsLoading, setMapsLoading] = useState(false);
  const [mapsResult, setMapsResult] = useState<{
    response: string;
    mapsUrls: Array<{ uri: string; title: string; reviewSnippet?: string }>;
  } | null>(null);
  const [mapsError, setMapsError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<{ name: string; lat: number; lng: number }>({
    name: 'Madurai Mandi (Central)',
    lat: 9.9252,
    lng: 78.1198,
  });

  // Search Grounding State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<{
    response: string;
    searchSources: Array<{ uri: string; title: string }>;
  } | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  const agroLocations = [
    { name: 'Madurai APMC Mandi', lat: 9.9252, lng: 78.1198 },
    { name: 'Koyambedu Wholesale Market, Chennai', lat: 13.0694, lng: 80.1948 },
    { name: 'Thanjavur Delta Paddy Depot', lat: 10.787, lng: 79.1378 },
    { name: 'Dindigul Vegetable Market', lat: 10.3673, lng: 77.9803 },
    { name: 'Salem Sanniyasigundu Mandi', lat: 11.6643, lng: 78.146 },
    { name: 'Coimbatore MGR Mandi', lat: 11.0168, lng: 76.9558 },
  ];

  const handleMapsSearch = async (overrideQuery?: string) => {
    const q = (overrideQuery || mapsQuery).trim();
    if (!q || mapsLoading) return;

    setMapsLoading(true);
    setMapsError(null);
    setMapsResult(null);

    try {
      const res = await callMapsGrounding(q, {
        latitude: selectedCity.lat,
        longitude: selectedCity.lng,
      });
      setMapsResult(res);
    } catch (err: any) {
      console.error('Maps Grounding Error:', err);
      setMapsError(err?.message || 'Failed to retrieve Google Maps grounded information.');
    } finally {
      setMapsLoading(false);
    }
  };

  const handleSearchGroundingCall = async (overrideQuery?: string) => {
    const q = (overrideQuery || searchQuery).trim();
    if (!q || searchLoading) return;

    setSearchLoading(true);
    setSearchError(null);
    setSearchResult(null);

    try {
      const res = await callSearchGrounding(q);
      setSearchResult(res);
    } catch (err: any) {
      console.error('Search Grounding Error:', err);
      setSearchError(err?.message || 'Failed to retrieve Google Search grounded information.');
    } finally {
      setSearchLoading(false);
    }
  };

  const detectLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setSelectedCity({
            name: language === 'ta' ? 'எனது தற்போதைய இருப்பிடம் (GPS)' : 'My Current GPS Location',
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        (err) => {
          console.warn('Geolocation denied, using default Tamil Nadu Mandi coordinates', err);
        }
      );
    }
  };

  const sampleMapQueries = language === 'ta'
    ? [
        'அருகிலுள்ள அரசு விதை விற்பனை மையம் மற்றும் உழவர் சந்தை எங்குள்ளது?',
        'மதுரை மற்றும் திண்டுக்கல் பகுதியில் தக்காளி ஏல மண்டிகள் மற்றும் குளிர்பதன கிடங்குகள்',
        'தஞ்சாவூர் டெல்டா பகுதியில் உள்ள அரசு நேரடி நெல் கொள்முதல் நிலையங்கள் (DPC)',
        'ஈரோடு பகுதியில் உள்ள மஞ்சள் மொத்த விற்பனை மண்டிகள்'
      ]
    : [
        'Nearby government regulated APMC mandis and cold storages',
        'Direct paddy procurement centers (DPC) and seed distribution depots',
        'Wholesale tomato and onion auction markets with road access',
        'Certified organic fertilizer and bio-manure retail centers'
      ];

  const sampleSearchQueries = language === 'ta'
    ? [
        'தமிழக அரசு நடப்பு ஆண்டுக்கான நெல் குறைந்தபட்ச ஆதரவு விலை (MSP) அறிவிப்பு',
        'IMD வானிலை ஆய்வு மையம்: வடகிழக்கு பருவமழை மற்றும் புயல் எச்சரிக்கை',
        'PM-KISAN மற்றும் தமிழக வேளாண் பட்ஜெட் மானிய திட்டங்களின் தற்போதைய நிலை',
        'கோயம்பேடு சந்தையில் காய்கறி விலை நிலவரம் மற்றும் வரத்து செய்திகள்'
      ]
    : [
        'Latest Tamil Nadu paddy Minimum Support Price (MSP) notification 2026',
        'IMD northeast monsoon rainfall alert & reservoir levels in Cauvery basin',
        'Koyambedu market vegetable arrival updates and price spikes',
        'Tamil Nadu agriculture tractor subsidy and solar pump scheme guidelines'
      ];

  return (
    <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
      {/* Tab Switcher */}
      <div className="p-4 sm:p-6 border-b border-stone-200 bg-stone-50/70 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-stone-900">
              {language === 'ta' ? 'AI நேரடி தகவல்கள் (Grounding)' : 'Google Grounding Hub'}
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
              gemini-3.5-flash
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {language === 'ta'
              ? 'Google Maps மற்றும் Google Search மூலமாக நிகழ்நேர உண்மையான தரவுகளுடன் சரிபார்க்கப்பட்ட பதில்கள்.'
              : 'Grounded intelligence powered by live Google Maps locations and real-time Google Search data.'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-stone-200/80 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('maps')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'maps'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>{language === 'ta' ? 'Google Maps தகவல்' : 'Google Maps Grounding'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('search')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'search'
                ? 'bg-white text-blue-800 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Search className="w-4 h-4 text-blue-600" />
            <span>{language === 'ta' ? 'Google Search தகவல்' : 'Google Search Grounding'}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-6 space-y-6">
        {activeTab === 'maps' && (
          <div className="space-y-5">
            {/* Geo anchor selector */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-700" />
                <span className="text-stone-700 font-medium">
                  {language === 'ta' ? 'ஆய்வு மையம் / மண்டலம்:' : 'Grounding Anchor Region:'}
                </span>
                <span className="font-semibold text-emerald-900">{selectedCity.name}</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCity.name}
                  onChange={(e) => {
                    const found = agroLocations.find((l) => l.name === e.target.value);
                    if (found) setSelectedCity(found);
                  }}
                  className="px-2.5 py-1.5 bg-white border border-emerald-300 rounded-lg text-xs text-stone-800 font-medium"
                >
                  {agroLocations.map((loc) => (
                    <option key={loc.name} value={loc.name}>
                      {loc.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={detectLocation}
                  className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                  title="Detect GPS"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">GPS</span>
                </button>
              </div>
            </div>

            {/* Input Form */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={mapsQuery}
                  onChange={(e) => setMapsQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleMapsSearch()}
                  placeholder={
                    language === 'ta'
                      ? 'எ.கா: அருகிலுள்ள உழவர் சந்தை, ஒழுங்குமுறை விற்பனைக் கூடம், குளிர்சாதன கிடங்கு...'
                      : 'E.g., Nearest APMC mandis, cold storages, government fertilizer depots...'
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-stone-900"
                />
              </div>

              <button
                type="button"
                onClick={() => handleMapsSearch()}
                disabled={mapsLoading || !mapsQuery.trim()}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-xs"
              >
                {mapsLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>{language === 'ta' ? 'வரைபடத்தில் தேடு' : 'Search Maps'}</span>
              </button>
            </div>

            {/* Suggested prompt chips */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-stone-500">
                {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட கேள்விகள்:' : 'Suggested Maps Queries:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleMapQueries.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setMapsQuery(q);
                      handleMapsSearch(q);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-900 border border-stone-200 transition-all text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {mapsError && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Maps Grounding Notice</p>
                  <p className="text-xs text-amber-800 mt-0.5">{mapsError}</p>
                </div>
              </div>
            )}

            {/* Results Section */}
            {mapsResult && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-sm leading-relaxed text-stone-800 whitespace-pre-wrap">
                  {mapsResult.response}
                </div>

                {/* Grounding URLs / Places List */}
                {mapsResult.mapsUrls && mapsResult.mapsUrls.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span>{language === 'ta' ? 'சரிபார்க்கப்பட்ட Google Maps இடங்கள் & இணைப்புகள்' : 'Grounded Google Maps Places & Direct Links'}</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mapsResult.mapsUrls.map((place, idx) => (
                        <a
                          key={idx}
                          href={place.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3.5 rounded-xl border border-stone-200 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 transition-all flex items-start justify-between gap-2 group shadow-2xs"
                        >
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-stone-900 text-sm group-hover:text-emerald-800 truncate">
                              {place.title}
                            </p>
                            {place.reviewSnippet && (
                              <p className="text-xs text-stone-500 line-clamp-2 mt-1 italic">
                                "{place.reviewSnippet}"
                              </p>
                            )}
                            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 mt-2">
                              {language === 'ta' ? 'வரைபடத்தில் பார்க்க' : 'Open in Google Maps'}
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <Navigation className="w-4 h-4" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-5">
            {/* Input Form */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchGroundingCall()}
                  placeholder={
                    language === 'ta'
                      ? 'எ.கா: நடப்பு பருவ நெல் கொள்முதல் விலை, உர மானியம், மழை எச்சரிக்கை...'
                      : 'E.g., Current MSP rate for paddy, fertilizer subsidy rules, IMD cyclone forecast...'
                  }
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-stone-900"
                />
              </div>

              <button
                type="button"
                onClick={() => handleSearchGroundingCall()}
                disabled={searchLoading || !searchQuery.trim()}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl font-semibold text-sm flex items-center gap-2 transition-all shadow-xs"
              >
                {searchLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>{language === 'ta' ? 'தேடல் தரவுடன் கேள்' : 'Search Grounding'}</span>
              </button>
            </div>

            {/* Suggested prompt chips */}
            <div className="space-y-1.5">
              <span className="text-xs font-medium text-stone-500">
                {language === 'ta' ? 'பரிந்துரைக்கப்பட்ட இணைய தேடல்கள்:' : 'Suggested Web Grounding Queries:'}
              </span>
              <div className="flex flex-wrap gap-2">
                {sampleSearchQueries.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setSearchQuery(q);
                      handleSearchGroundingCall(q);
                    }}
                    className="text-xs px-3 py-1.5 rounded-full bg-stone-100 hover:bg-blue-100 text-stone-700 hover:text-blue-900 border border-stone-200 transition-all text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {searchError && (
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-sm text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Search Grounding Notice</p>
                  <p className="text-xs text-amber-800 mt-0.5">{searchError}</p>
                </div>
              </div>
            )}

            {/* Results Section */}
            {searchResult && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-sm leading-relaxed text-stone-800 whitespace-pre-wrap">
                  {searchResult.response}
                </div>

                {/* Grounding Source Web Badges */}
                {searchResult.searchSources && searchResult.searchSources.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1.5">
                      <Search className="w-4 h-4 text-blue-600" />
                      <span>{language === 'ta' ? 'சரிபார்க்கப்பட்ட அதிகாரப்பூர்வ இணைய ஆதாரங்கள்' : 'Grounded Google Search Sources & References'}</span>
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {searchResult.searchSources.map((source, idx) => (
                        <a
                          key={idx}
                          href={source.uri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 text-xs font-medium transition-all shadow-2xs group"
                        >
                          <span className="truncate max-w-[240px]">{source.title}</span>
                          <ExternalLink className="w-3 h-3 text-blue-500 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
