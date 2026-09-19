import React, { useState } from 'react';
import {
  Users,
  MessageSquare,
  ThumbsUp,
  Share2,
  CheckCircle2,
  MapPin,
  Plus,
  Mic,
  Camera,
  Filter,
  Search,
  Sparkles,
  X
} from 'lucide-react';
import { CommunityPost, Language } from '../types';
import { mockCommunityPosts } from '../data/mockData';

interface CommunityForumProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const CommunityForum: React.FC<CommunityForumProps> = ({
  language,
  onNavigate
}) => {
  const [posts, setPosts] = useState<CommunityPost[]>(() =>
    (mockCommunityPosts || []).map(p => ({
      ...p,
      title: p.title || (p.content ? p.content.slice(0, 45) + '...' : 'Farmer Discussion'),
      titleTamil: p.titleTamil || (p.contentTamil ? p.contentTamil.slice(0, 45) + '...' : 'விவசாய விவாதம்'),
      likesCount: p.likesCount ?? p.likes ?? 0,
      commentsCount: p.commentsCount ?? (p.comments?.length || p.replies?.length || 0),
      comments: p.comments || (p.replies ? p.replies.map(r => ({
        id: r.id,
        authorName: r.authorName,
        text: r.content,
        timeAgo: r.timestamp,
        isVerified: !!r.authorBadge
      })) : [])
    }))
  );
  const [filterTag, setFilterTag] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // New Post Modal
  const [showNewPostModal, setShowNewPostModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newContent, setNewContent] = useState<string>('');
  const [newCropTag, setNewCropTag] = useState<string>('Tomato');
  const [isVoiceRecording, setIsVoiceRecording] = useState<boolean>(false);

  // New Comment State
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState<string>('');

  const filterOptions = ['All', 'My Crop', 'My District', 'Price Update', 'Pest Control', 'Organic'];

  const handleLikePost = (postId: string) => {
    setPosts(prev => (prev || []).map(p => {
      if (p.id === postId) {
        const hasLiked = (p as any).isLikedByCurrentUser;
        return {
          ...p,
          likesCount: hasLiked ? (p.likesCount || 1) - 1 : (p.likesCount || 0) + 1,
          isLikedByCurrentUser: !hasLiked
        };
      }
      return p;
    }));
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post_${Date.now()}`,
      authorName: 'Ramesh Sundaram',
      authorLocation: 'Vadipatti, Madurai',
      authorBadge: 'Progressive Farmer',
      cropTag: newCropTag,
      title: newTitle,
      titleTamil: newTitle,
      content: newContent,
      contentTamil: newContent,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      timestamp: 'Just now',
      timeAgo: 'Just now',
      likes: 1,
      likesCount: 1,
      commentsCount: 0,
      isVerifiedFarmer: true,
      hasAudioVoice: false,
      comments: [],
      replies: []
    };

    setPosts(prev => [newPost, ...(prev || [])]);
    setNewTitle('');
    setNewContent('');
    setShowNewPostModal(false);
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;

    setPosts(prev => (prev || []).map(p => {
      if (p.id === postId) {
        const existingComments = p.comments || [];
        return {
          ...p,
          commentsCount: (p.commentsCount || existingComments.length) + 1,
          comments: [
            ...existingComments,
            {
              id: `c_${Date.now()}`,
              authorName: 'Ramesh Sundaram',
              text: commentInput,
              timeAgo: 'Just now',
              isVerified: true
            }
          ]
        };
      }
      return p;
    }));
    setCommentInput('');
    setActiveCommentPostId(null);
  };

  const filteredPosts = (posts || []).filter(p => {
    const cropTag = p.cropTag || '';
    const authorLocation = p.authorLocation || '';
    const matchesFilter = filterTag === 'All' ||
      (filterTag === 'My Crop' && (cropTag.includes('Tomato') || cropTag.includes('Paddy'))) ||
      (filterTag === 'My District' && authorLocation.includes('Madurai')) ||
      cropTag.toLowerCase().includes(filterTag.toLowerCase());

    const titleStr = p.title || '';
    const contentStr = p.content || '';
    const titleTaStr = p.titleTamil || '';
    const contentTaStr = p.contentTamil || '';

    const queryLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery.trim() ||
      titleStr.toLowerCase().includes(queryLower) ||
      contentStr.toLowerCase().includes(queryLower) ||
      titleTaStr.includes(searchQuery) ||
      contentTaStr.includes(searchQuery);

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 sm:p-7 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'உழவர் சமூகம் & அனுபவப் பகிர்வு' : 'Farmer Community Network'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'ta' ? 'விவசாயிகள் களம் (Peer Knowledge Hub)' : 'Farmer-to-Farmer Exchange'}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            {language === 'ta'
              ? 'உங்கள் நிலத்து அனுபவம், உடனடி சந்தை நிலவரம் மற்றும் பூச்சி மேலாண்மை யோசனைகளை சக விவசாயிகளுடன் பகிருங்கள்.'
              : 'Share real-time mandi updates, field remedies, and learn directly from peer progressive farmers across districts.'}
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="px-5 py-3 rounded-2xl bg-white hover:bg-emerald-50 text-emerald-900 font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4 text-emerald-700" />
          <span>{language === 'ta' ? '+ கேள்வி / தகவல் பதிவிட' : '+ Share Experience / Ask'}</span>
        </button>
      </div>

      {/* Filter Bar & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {filterOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setFilterTag(opt)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                filterTag === opt
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {opt === 'All' ? (language === 'ta' ? 'அனைத்தும்' : 'All') :
               opt === 'My Crop' ? (language === 'ta' ? 'என் பயிர்' : 'My Crop') :
               opt === 'My District' ? (language === 'ta' ? 'என் மாவட்டம்' : 'My District') : opt}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={language === 'ta' ? 'கேள்வி அல்லது கருத்து தேட...' : 'Search discussions...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-stone-200 p-5 sm:p-6 shadow-xs hover:border-emerald-200 transition-all space-y-4"
          >
            {/* Author Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                  {post.authorName.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-bold text-stone-900 text-sm">{post.authorName}</h3>
                    {post.isVerifiedFarmer && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        {post.authorBadge}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 mt-0.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {post.authorLocation}
                    </span>
                    <span>•</span>
                    <span>{post.timeAgo}</span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                🌱 {post.cropTag}
              </span>
            </div>

            {/* Post Content */}
            <div className="space-y-1.5">
              <h4 className="font-extrabold text-stone-900 text-base leading-snug">
                {language === 'ta' ? post.titleTamil : post.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {language === 'ta' ? post.contentTamil : post.content}
              </p>
            </div>

            {/* Attached Photo if available */}
            {post.image && (
              <div className="rounded-2xl overflow-hidden max-h-72 bg-stone-100">
                <img src={post.image} alt="Post Attachment" className="w-full h-full object-cover" />
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className={`flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                    post.isLikedByCurrentUser ? 'text-emerald-700' : 'hover:text-stone-800'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${post.isLikedByCurrentUser ? 'fill-emerald-600' : ''}`} />
                  <span>{post.likesCount} {language === 'ta' ? 'பயனுள்ளது' : 'Helpful'}</span>
                </button>

                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className="flex items-center gap-1.5 font-bold hover:text-stone-800 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.commentsCount} {language === 'ta' ? 'பதில்கள்' : 'Comments'}</span>
                </button>
              </div>

              <button
                onClick={() => alert('Link copied to share / இணைப்பு பகிரப்பட்டது!')}
                className="flex items-center gap-1 font-semibold hover:text-stone-800 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{language === 'ta' ? 'பகிர்' : 'Share'}</span>
              </button>
            </div>

            {/* Expanded Comments Thread */}
            {activeCommentPostId === post.id && (
              <div className="pt-3 border-t border-stone-100 space-y-3 bg-stone-50/70 p-4 rounded-2xl">
                {(post.comments || []).map(c => (
                  <div key={c.id} className="text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-stone-900">{c.authorName}</span>
                      <span className="text-[10px] text-stone-400">{c.timeAgo}</span>
                    </div>
                    <p className="text-stone-700">{c.text}</p>
                  </div>
                ))}

                <div className="flex gap-2 pt-2">
                  <input
                    type="text"
                    placeholder={language === 'ta' ? 'உங்கள் பதிலை எழுதவும்...' : 'Write your advice or answer...'}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-stone-200 bg-white"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    {language === 'ta' ? 'அனுப்பு' : 'Reply'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-bold text-stone-900 text-base">
                {language === 'ta' ? 'சக விவசாயிகளுடன் பகிருங்கள்' : 'Create Community Post'}
              </h3>
              <button
                onClick={() => setShowNewPostModal(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddPost} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {language === 'ta' ? 'பயிர் வகை' : 'Crop Category'}
                </label>
                <select
                  value={newCropTag}
                  onChange={(e) => setNewCropTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-semibold"
                >
                  <option value="Tomato">Tomato (தக்காளி)</option>
                  <option value="Paddy">Paddy / Rice (நெல்)</option>
                  <option value="Chilli">Chilli (மிளகாய்)</option>
                  <option value="Cotton">Cotton (பருத்தி)</option>
                  <option value="Organic">Organic Farming (இயற்கை விவசாயம்)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {language === 'ta' ? 'தலைப்பு / வினா' : 'Topic / Question'}
                </label>
                <input
                  type="text"
                  placeholder="e.g. தக்காளி விலை நிலவரம் அல்லது இலை சுருள் மருந்து"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-stone-700 block mb-1">
                  {language === 'ta' ? 'விவரம் & உங்கள் அனுபவம்' : 'Detailed Experience'}
                </label>
                <textarea
                  rows={3}
                  placeholder="உங்கள் பண்ணை நிலவரத்தை விவரிக்கவும்..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200"
                />
              </div>

              {/* Simulated Voice Post Button */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-900">
                  <Mic className={`w-4 h-4 ${isVoiceRecording ? 'text-red-500 animate-pulse' : 'text-emerald-700'}`} />
                  <span className="font-bold">
                    {isVoiceRecording
                      ? (language === 'ta' ? 'பதிவாகிறது... பேசுங்கள்...' : 'Recording voice...')
                      : (language === 'ta' ? 'குரல் வழியே பதிவிடலாம்' : 'Voice Post Option')}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsVoiceRecording(!isVoiceRecording);
                    if (!isVoiceRecording) {
                      setTimeout(() => {
                        setNewContent(language === 'ta'
                          ? 'இன்று மதுரை பரவை மார்க்கெட்டில் தக்காளி முதல் தரம் ₹30-க்கு நல்ல வரவேற்புடன் விற்றது.'
                          : 'Today Madurai Paravai mandi saw high arrivals with Grade A tomato fetching ₹30/kg.');
                        setIsVoiceRecording(false);
                      }, 2000);
                    }
                  }}
                  className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold cursor-pointer"
                >
                  {isVoiceRecording ? 'Stop' : (language === 'ta' ? 'பேசுக' : 'Speak')}
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md cursor-pointer transition-colors"
              >
                {language === 'ta' ? 'பதிவை வெளியிடுக (Publish Post)' : 'Publish Post'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
