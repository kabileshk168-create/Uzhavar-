import React, { useState } from 'react';
import {
  GraduationCap,
  Play,
  CheckCircle2,
  HelpCircle,
  Award,
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles,
  ChevronRight,
  RotateCcw
} from 'lucide-react';
import { LearningCourse, Language } from '../types';
import { mockCourses } from '../data/mockData';
import confetti from 'canvas-confetti';

interface LearnFarmingProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const LearnFarming: React.FC<LearnFarmingProps> = ({
  language,
  onNavigate
}) => {
  const [courses, setCourses] = useState<LearningCourse[]>(mockCourses);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCourse, setActiveCourse] = useState<LearningCourse | null>(mockCourses[0]);
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  // Quiz State
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [quizAnswers, setQuizAnswers] = useState<{ [qIdx: number]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const categories = [
    'All',
    'Getting Started',
    'Crop Basics',
    'Water Management',
    'Fertilizer Basics',
    'Pest Awareness',
    'Selling & Market',
    'Farm Economics'
  ];

  const filteredCourses = selectedCategory === 'All'
    ? (courses || [])
    : (courses || []).filter(c => c && c.category === selectedCategory);

  const handleSelectCourse = (course: LearningCourse) => {
    setActiveCourse(course);
    setActiveStepIndex(0);
    setShowQuiz(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleSelectQuizOption = (qIdx: number, optIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx });
  };

  const handleSubmitQuiz = () => {
    if (!activeCourse) return;
    let correctCount = 0;
    activeCourse.quiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setQuizSubmitted(true);

    if (correctCount === activeCourse.quiz.length) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {
        // Ignored
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-6 sm:p-7 rounded-3xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{language === 'ta' ? 'ஆரம்பநிலை விவசாயக் கல்வி' : 'Beginner Farmer Academy'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {language === 'ta' ? 'விவசாயம் கற்போம் (Learn Farming)' : 'Step-by-Step Practical Farming'}
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            {language === 'ta'
              ? 'விதைப்பு, சொட்டுநீர் பாசனம், உரம், பூச்சி மேலாண்மை மற்றும் விற்பனை வரை எளிய தமிழ் விளக்கங்கள் & வினாடி வினா.'
              : 'Beginner-friendly visual modules, step-by-step agronomy guides, interactive quizzes, and farm certificates.'}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur rounded-2xl p-3 border border-white/20 text-xs text-emerald-100 max-w-xs shrink-0">
          <div className="flex items-center gap-1.5 font-bold text-white mb-1">
            <Award className="w-4 h-4 text-amber-300" />
            <span>{language === 'ta' ? 'கற்றல் சான்றிதழ்' : 'Knowledge Certificate'}</span>
          </div>
          <p className="text-[11px] text-emerald-100/90">
            {language === 'ta' ? 'பாடங்களை முடித்து வினாடி வினாவில் தேர்ச்சி பெற்று உழவர் பேட்ஜ் பெறுங்கள்.' : 'Complete modules and quizzes to earn certified progressive farmer badges.'}
          </p>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Course Grid & Active Lesson View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Course Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="font-bold text-stone-900 text-base">
            {language === 'ta' ? 'கிடைக்கும் பாடநெறிகள்' : 'Available Learning Paths'}
          </h2>

          <div className="space-y-3">
            {filteredCourses.map(course => {
              const isSelected = activeCourse?.id === course.id;
              return (
                <div
                  key={course.id}
                  onClick={() => handleSelectCourse(course)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50/70 border-emerald-400 shadow-sm ring-1 ring-emerald-400/40'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex gap-3.5 items-start">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {language === 'ta' ? course.categoryTamil : course.category}
                        </span>
                        <span className="text-[11px] text-stone-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.durationMinutes} mins
                        </span>
                      </div>
                      <h3 className="font-bold text-stone-900 text-sm mt-1 truncate">
                        {language === 'ta' ? course.titleTamil : course.title}
                      </h3>

                      {/* Progress Bar */}
                      <div className="mt-2.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-stone-500 mb-1">
                          <span>{language === 'ta' ? 'முன்னேற்றம்:' : 'Progress:'}</span>
                          <span className="text-emerald-700">{course.progressPercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-600 rounded-full transition-all"
                            style={{ width: `${course.progressPercent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Course Lesson & Quiz (7 cols) */}
        {activeCourse && (
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-5">
            {/* Header */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {language === 'ta' ? activeCourse.categoryTamil : activeCourse.category} • {activeCourse.level}
                </span>
                <span className="text-xs font-semibold text-stone-400">
                  {activeCourse.lessonsCount} {language === 'ta' ? 'பாடங்கள்' : 'Lessons'}
                </span>
              </div>
              <h2 className="text-xl font-extrabold text-stone-900 mt-1">
                {language === 'ta' ? activeCourse.titleTamil : activeCourse.title}
              </h2>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                {language === 'ta' ? activeCourse.descriptionTamil : activeCourse.description}
              </p>
            </div>

            {/* Video / Visual Demonstration Mockup */}
            <div className="relative rounded-2xl overflow-hidden bg-stone-900 h-52 flex items-center justify-center group cursor-pointer">
              <img
                src={activeCourse.thumbnail}
                alt="Lesson Preview"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="w-6 h-6 ml-0.5" />
              </div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs font-bold">
                <span>{language === 'ta' ? 'வீடியோ செயல்விளக்கம் (Video Lesson)' : 'Illustrated Video Walkthrough'}</span>
                <span className="bg-black/60 px-2 py-0.5 rounded text-[10px]">HD 1080p</span>
              </div>
            </div>

            {/* Step-by-Step Guide or Quiz Toggle */}
            <div className="flex p-1 bg-stone-100 rounded-2xl">
              <button
                onClick={() => setShowQuiz(false)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  !showQuiz ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                📖 {language === 'ta' ? 'படிநிலை வழிகாட்டி' : 'Step-by-Step Guide'}
              </button>
              <button
                onClick={() => setShowQuiz(true)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                  showQuiz ? 'bg-white text-emerald-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                ✍️ {language === 'ta' ? 'வினாடி வினா (Quiz)' : 'Interactive Quiz'}
              </button>
            </div>

            {/* Step Content */}
            {!showQuiz && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {activeCourse.steps.map((step, idx) => (
                    <button
                      key={step.id}
                      onClick={() => setActiveStepIndex(idx)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                        activeStepIndex === idx
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                      }`}
                    >
                      Step {idx + 1}
                    </button>
                  ))}
                </div>

                {activeCourse.steps[activeStepIndex] && (
                  <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-stone-900 text-sm">
                        {language === 'ta'
                          ? activeCourse.steps[activeStepIndex].titleTamil
                          : activeCourse.steps[activeStepIndex].title}
                      </h4>
                      <span className="text-[11px] text-stone-400">
                        {activeCourse.steps[activeStepIndex].duration}
                      </span>
                    </div>
                    <p className="text-xs text-stone-700 leading-relaxed">
                      {language === 'ta'
                        ? activeCourse.steps[activeStepIndex].contentTamil
                        : activeCourse.steps[activeStepIndex].content}
                    </p>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer ml-auto"
                  >
                    <span>{language === 'ta' ? 'வினாடி வினா தொடங்கு' : 'Take Lesson Quiz'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Quiz Content */}
            {showQuiz && (
              <div className="space-y-4">
                <h3 className="font-bold text-stone-900 text-sm flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>{language === 'ta' ? 'அறிவு வினாடி வினா' : 'Lesson Comprehension Quiz'}</span>
                </h3>

                {activeCourse.quiz.map((q, qIdx) => (
                  <div key={qIdx} className="p-4 bg-stone-50 rounded-2xl border border-stone-200/80 space-y-2.5">
                    <p className="font-bold text-xs sm:text-sm text-stone-900">
                      {qIdx + 1}. {language === 'ta' ? q.questionTamil : q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(language === 'ta' ? q.optionsTamil : q.options).map((opt, optIdx) => {
                        const isChosen = quizAnswers[qIdx] === optIdx;
                        const isCorrect = q.correctIndex === optIdx;
                        let btnStyle = 'border-stone-200 bg-white hover:bg-stone-50 text-stone-700';

                        if (quizSubmitted) {
                          if (isCorrect) {
                            btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                          } else if (isChosen && !isCorrect) {
                            btnStyle = 'border-red-400 bg-red-50 text-red-900';
                          }
                        } else if (isChosen) {
                          btnStyle = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectQuizOption(qIdx, optIdx)}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}

                {/* Quiz Actions & Result */}
                <div className="pt-2">
                  {!quizSubmitted ? (
                    <button
                      onClick={handleSubmitQuiz}
                      className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm cursor-pointer"
                    >
                      {language === 'ta' ? 'விடைகளை சமர்ப்பிக்க (Submit Quiz)' : 'Submit Answers'}
                    </button>
                  ) : (
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                      <div className="flex items-center justify-center gap-1.5 text-emerald-800 font-bold text-sm">
                        <Award className="w-5 h-5 text-amber-500" />
                        <span>
                          {language === 'ta' 
                            ? `உங்கள் மதிப்பெண்: ${score} / ${activeCourse.quiz.length}`
                            : `Your Score: ${score} / ${activeCourse.quiz.length}`}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-900">
                        {score === activeCourse.quiz.length
                          ? (language === 'ta' ? 'அற்புதம்! முழு மதிப்பெண் பெற்றுள்ளீர்கள். சான்றிதழ் பேட்ஜ் சேர்க்கப்பட்டது.' : 'Excellent! Perfect score. Progressive farmer badge earned.')
                          : (language === 'ta' ? 'நன்று! மீண்டும் முயற்சி செய்து முழு மதிப்பெண் பெறலாம்.' : 'Good attempt! Review the lesson steps to master the concepts.')}
                      </p>
                      <button
                        onClick={() => { setQuizSubmitted(false); setQuizAnswers({}); }}
                        className="text-xs font-bold text-emerald-700 hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>{language === 'ta' ? 'மீண்டும் எழுத' : 'Retake Quiz'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
