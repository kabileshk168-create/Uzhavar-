import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { MarketIntelligence } from './components/MarketIntelligence';
import { FarmerBuyerMarketplace } from './components/FarmerBuyerMarketplace';
import { FarmServicesSeeds } from './components/FarmServicesSeeds';
import { ProfitPlanner } from './components/ProfitPlanner';
import { AIFarmingAssistant } from './components/AIFarmingAssistant';
import { LearnFarming } from './components/LearnFarming';
import { CommunityForum } from './components/CommunityForum';
import { GovernmentServices } from './components/GovernmentServices';
import { WeatherAdvisory } from './components/WeatherAdvisory';
import { SmartTransport } from './components/SmartTransport';
import { FarmerReport } from './components/FarmerReport';
import { FutureAIFeatures } from './components/FutureAIFeatures';
import { SettingsTrust } from './components/SettingsTrust';
import { PricePredictionScreen } from './components/agrinext/PricePredictionScreen';
import { CropAdvisoryScreen } from './components/agrinext/CropAdvisoryScreen';
import { SetPriceAlertScreen } from './components/agrinext/SetPriceAlertScreen';
import { MarketTrendsScreen } from './components/agrinext/MarketTrendsScreen';
import { VoiceListeningModal } from './components/VoiceListeningModal';
import { LanguageModal } from './components/LanguageModal';
import { DemoJourneyWalkthrough } from './components/DemoJourneyWalkthrough';
import { Language, UserRole, NotificationItem, UserProfile } from './types';
import { initialUser, mockNotifications } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('ta');
  const [currentRole, setCurrentRole] = useState<UserRole>('farmer');
  const [userProfile] = useState<UserProfile>(initialUser);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);

  // Modals
  const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);
  const [voiceInitialQuery, setVoiceInitialQuery] = useState<string>('');
  const [isDemoJourneyOpen, setIsDemoJourneyOpen] = useState<boolean>(false);

  // Check if first launch
  useEffect(() => {
    const hasSeenLanguage = localStorage.getItem('uzhavar_has_selected_lang');
    if (!hasSeenLanguage) {
      setShowLanguageModal(true);
    }
  }, []);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('uzhavar_has_selected_lang', 'true');
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleOpenVoiceWithQuery = (query: string) => {
    setVoiceInitialQuery(query);
    setIsVoiceModalOpen(true);
  };

  const handleOpenVoiceGeneral = () => {
    setVoiceInitialQuery('');
    setIsVoiceModalOpen(true);
  };

  const handleNavigate = (tab: string) => {
    if (tab === 'voice') {
      handleOpenVoiceGeneral();
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Main Navigation Header */}
      <Header
        language={language}
        onSelectLanguage={handleSelectLanguage}
        onOpenLanguageModal={() => setShowLanguageModal(true)}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
        userProfile={userProfile}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onOpenVoice={handleOpenVoiceGeneral}
        onNavigate={handleNavigate}
        activeTab={activeTab}
      />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        {/* Desktop Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onNavigate={handleNavigate}
          language={language}
        />

        {/* Dynamic Main Workspace Screen with responsive padding */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 w-full pb-24 lg:pb-8">
          {activeTab === 'home' && (
            <HomeScreen
              language={language}
              onNavigate={handleNavigate}
              onOpenVoice={handleOpenVoiceGeneral}
              onOpenVoiceWithQuery={handleOpenVoiceWithQuery}
              onStartDemoJourney={() => setIsDemoJourneyOpen(true)}
              currentRole={currentRole}
            />
          )}

          {(activeTab === 'price_prediction' || activeTab === 'agrinext') && (
            <PricePredictionScreen
              language={language}
              onBack={() => handleNavigate('home')}
              onNavigateTab={handleNavigate}
            />
          )}

          {activeTab === 'crop_advisory' && (
            <CropAdvisoryScreen
              language={language}
              onBack={() => handleNavigate('home')}
              onOpenCropDoctor={() => handleNavigate('ai_crop_doctor')}
              onNavigateTab={handleNavigate}
            />
          )}

          {activeTab === 'price_alert' && (
            <SetPriceAlertScreen
              language={language}
              onBack={() => handleNavigate('home')}
              onNavigateTab={handleNavigate}
            />
          )}

          {activeTab === 'market_trends' && (
            <MarketTrendsScreen
              language={language}
              onBack={() => handleNavigate('home')}
              onSelectCrop={() => handleNavigate('price_prediction')}
              onNavigateTab={handleNavigate}
            />
          )}

          {activeTab === 'market' && (
            <MarketIntelligence
              language={language}
              onNavigate={handleNavigate}
              onOpenVoiceWithQuery={handleOpenVoiceWithQuery}
            />
          )}

          {activeTab === 'marketplace' && (
            <FarmerBuyerMarketplace
              language={language}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'farm_services' && (
            <FarmServicesSeeds
              language={language}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'profit_calc' && (
            <ProfitPlanner
              language={language}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'ai_crop_doctor' && (
            <AIFarmingAssistant
              language={language}
              onNavigate={handleNavigate}
              defaultMode="photo"
            />
          )}

          {activeTab === 'learning' && (
            <LearnFarming
              language={language}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'community' && (
            <CommunityForum
              language={language}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'government' && (
            <GovernmentServices
              language={language}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'weather' && (
            <WeatherAdvisory
              language={language}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'transport' && (
            <SmartTransport
              language={language}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'reports' && (
            <FarmerReport
              language={language}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'future_ai' && (
            <FutureAIFeatures
              language={language}
              onNavigate={handleNavigate}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTrust
              language={language}
              onSelectLanguage={handleSelectLanguage}
              onOpenLanguageModal={() => setShowLanguageModal(true)}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <BottomNav
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenVoice={handleOpenVoiceGeneral}
        language={language}
      />

      {/* Global Voice Interaction Modal */}
      <VoiceListeningModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        language={language}
        onNavigate={handleNavigate}
        initialQuery={voiceInitialQuery}
      />

      {/* First-Launch Language Selector Modal */}
      {showLanguageModal && (
        <LanguageModal
          currentLanguage={language}
          onSelectLanguage={handleSelectLanguage}
          onClose={() => setShowLanguageModal(false)}
        />
      )}

      {/* End-to-End Walkthrough Modal */}
      <DemoJourneyWalkthrough
        isOpen={isDemoJourneyOpen}
        onClose={() => setIsDemoJourneyOpen(false)}
        language={language}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
