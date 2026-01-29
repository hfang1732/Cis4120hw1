import { useState } from 'react';
import Search from './imports/Search';
import CourseDescription from './imports/CourseDescription';
import AIAdvisor from './components/AIAdvisor';

export default function App() {
  const [currentView, setCurrentView] = useState<'search' | 'description'>('search');
  const [showAIAdvisor, setShowAIAdvisor] = useState(false);

  return (
    <div className="relative w-full h-screen max-w-[414px] mx-auto bg-white">
      {currentView === 'search' && (
        <Search 
          onSeeFullDescription={() => setCurrentView('description')}
          onAIAdvisorClick={() => setShowAIAdvisor(true)}
        />
      )}
      
      {currentView === 'description' && (
        <CourseDescription 
          onBack={() => setCurrentView('search')}
          onGeminiClick={() => setShowAIAdvisor(true)}
        />
      )}

      {showAIAdvisor && (
        <AIAdvisor onClose={() => setShowAIAdvisor(false)} />
      )}
    </div>
  );
}
