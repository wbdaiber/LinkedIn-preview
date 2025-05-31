import { useState } from 'react';
import { useCharacterCount } from '@/hooks/useCharacterCount';
import { useMessageHistory } from '@/hooks/useMessageHistory';
import { useAnalytics } from '@/hooks/useAnalytics';
import { useClipboard } from '@/hooks/useClipboard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash2, MessageSquare, TrendingUp, Lightbulb, UserCheck, Target, Clock, User } from 'lucide-react';

export default function LinkedInMessageTool() {
  const { messageText, updateMessage, clearMessage, characterData } = useCharacterCount();
  const { history, saveToHistory, clearHistory, getRelativeTime } = useMessageHistory();
  const analytics = useAnalytics(history);
  const { copyToClipboard, isSuccess, error } = useClipboard();
  const [showFullPreview, setShowFullPreview] = useState(false);

  const handleCopyMessage = async () => {
    if (messageText.trim()) {
      const success = await copyToClipboard(messageText);
      if (success) {
        saveToHistory(messageText);
      }
    }
  };

  const handleCopyFromHistory = async (historyItem: any) => {
    await copyToClipboard(historyItem.text);
  };

  const handleSelectFromHistory = (historyItem: any) => {
    updateMessage(historyItem.text);
  };

  const getCounterColor = (color: string) => {
    switch (color) {
      case 'green': return 'text-green-400';
      case 'yellow': return 'text-yellow-400';
      case 'orange': return 'text-orange-400';
      case 'red': return 'text-red-400';
      default: return 'text-green-400';
    }
  };

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'orange': return 'bg-orange-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-green-500';
    }
  };

  const getIndicatorColor = (color: string) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'yellow': return 'bg-yellow-500';
      case 'orange': return 'bg-orange-500';
      case 'red': return 'bg-red-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="min-h-screen bg-dark-200">
      {/* Header */}
      <header className="border-b border-white/10 bg-dark-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-3 mb-2">
            <MessageSquare className="h-8 w-8 text-blue-300" />
            <h1 className="text-2xl font-semibold text-light-100">LinkedIn Message Tool</h1>
          </div>
          <p className="text-light-100/70 text-sm">Craft effective LinkedIn messages within platform constraints</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Composition Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Character Count Dashboard */}
            <Card className="bg-dark-100 border-white/10">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {/* Preview Character Count */}
                  <div className="bg-dark-300 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-light-100/70 text-sm">Preview Limit</span>
                      <div className={`w-3 h-3 rounded-full ${getIndicatorColor(characterData.previewColor)}`}></div>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className={`text-2xl font-mono font-semibold ${getCounterColor(characterData.previewColor)}`}>
                        {characterData.previewCount}
                      </span>
                      <span className="text-light-100/50 text-sm font-mono">/ 58</span>
                    </div>
                    <div className="w-full bg-dark-200 rounded-full h-2 mt-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-200 ${getProgressColor(characterData.previewColor)}`}
                        style={{ width: `${Math.min(characterData.previewPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Total Character Count */}
                  <div className="bg-dark-300 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-light-100/70 text-sm">Total Limit</span>
                      <div className={`w-3 h-3 rounded-full ${getIndicatorColor(characterData.totalColor)}`}></div>
                    </div>
                    <div className="flex items-baseline space-x-2">
                      <span className={`text-2xl font-mono font-semibold ${getCounterColor(characterData.totalColor)}`}>
                        {characterData.totalCount}
                      </span>
                      <span className="text-light-100/50 text-sm font-mono">/ 400</span>
                    </div>
                    <div className="w-full bg-dark-200 rounded-full h-2 mt-3">
                      <div 
                        className={`h-2 rounded-full transition-all duration-200 ${getProgressColor(characterData.totalColor)}`}
                        style={{ width: `${Math.min(characterData.totalPercentage, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Message Composition Textarea */}
                <div className="space-y-3">
                  <label htmlFor="messageText" className="block text-sm font-medium text-light-100/90">
                    Compose Your LinkedIn Message
                  </label>
                  <Textarea
                    id="messageText"
                    value={messageText}
                    onChange={(e) => updateMessage(e.target.value)}
                    placeholder="Hi [Name], I came across your profile and was impressed by your experience in..."
                    className="w-full h-40 bg-dark-300 border-white/20 text-light-100 placeholder:text-light-100/40 focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none"
                  />
                  
                  {/* Quick Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button 
                      onClick={handleCopyMessage}
                      disabled={!messageText.trim()}
                      className="flex-1 bg-blue-300 hover:bg-blue-400 text-white font-medium min-h-[44px]"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Message
                    </Button>
                    <Button 
                      onClick={clearMessage}
                      variant="outline"
                      className="bg-dark-100 hover:bg-dark-100/80 border-white/20 text-light-100 font-medium min-h-[44px]"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Clear
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* LinkedIn Preview Simulation */}
            <Card className="bg-dark-100 border-white/10">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-light-100">
                  <MessageSquare className="w-5 h-5 text-blue-300" />
                  <span>LinkedIn Preview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-dark-300 rounded-lg border border-white/10 p-4">
                  {/* Preview Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-300 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-light-100 text-sm font-medium">Your Name</div>
                      <div className="text-light-100/60 text-xs">Professional Title</div>
                    </div>
                  </div>
                  
                  {/* Preview Text */}
                  <div className="space-y-2">
                    {messageText ? (
                      <>
                        <div className="text-light-100/90 text-sm leading-relaxed">
                          {/* Preview Text (58 chars) */}
                          <span className={characterData.isPreviewOver ? "bg-yellow-400/20 border border-yellow-400/30 rounded px-1" : ""}>
                            {messageText.substring(0, 58)}
                          </span>
                          {messageText.length > 58 && (
                            <>
                              <span className="text-light-100/40">...</span>
                              {/* Show More Button */}
                              <div className="mt-2">
                                <button 
                                  onClick={() => setShowFullPreview(!showFullPreview)}
                                  className="text-blue-300 text-sm hover:underline"
                                >
                                  {showFullPreview ? 'Show less' : 'Show more'}
                                </button>
                              </div>
                              {/* Full Message */}
                              {showFullPreview && (
                                <div className="text-light-100/90 text-sm leading-relaxed mt-2">
                                  {messageText}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="text-light-100/50 text-sm italic">
                        Your message preview will appear here...
                      </div>
                    )}
                    
                    {/* Preview Actions */}
                    <div className="flex items-center space-x-4 mt-4 pt-3 border-t border-white/10">
                      <button className="text-light-100/60 hover:text-light-100 text-sm flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>Reply</span>
                      </button>
                      <button className="text-light-100/60 hover:text-light-100 text-sm flex items-center space-x-1">
                        <Copy className="w-4 h-4" />
                        <span>Forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Message History */}
            <Card className="bg-dark-100 border-white/10">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-light-100">Recent Messages</CardTitle>
                  {history.length > 0 && (
                    <Button 
                      onClick={clearHistory}
                      variant="ghost"
                      size="sm"
                      className="text-light-100/60 hover:text-light-100"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {history.length > 0 ? (
                    history.map((item) => (
                      <div 
                        key={item.id}
                        className="bg-dark-300 rounded-lg p-3 border border-white/10 cursor-pointer hover:border-white/20 transition-colors duration-200"
                        onClick={() => handleSelectFromHistory(item)}
                      >
                        <div className="text-light-100/90 text-sm line-clamp-2 mb-2">
                          {item.text}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-light-100/50 text-xs">
                            {getRelativeTime(item.timestamp)}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-light-100/50 text-xs font-mono">
                              {item.characterCount}/400
                            </span>
                            <Button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopyFromHistory(item);
                              }}
                              variant="ghost"
                              size="sm"
                              className="text-blue-300 hover:text-blue-400 p-1 h-auto"
                            >
                              <Copy className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-light-100/50">
                      <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No recent messages</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Analytics Dashboard */}
            <Card className="bg-dark-100 border-white/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-light-100">Session Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <span className="text-light-100/70 text-sm">Messages Created</span>
                    <span className="text-light-100 font-semibold">{analytics.messagesCreated}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <span className="text-light-100/70 text-sm">Avg. Length</span>
                    <span className="text-light-100 font-semibold font-mono">{analytics.averageLength} chars</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-2">
                    <span className="text-light-100/70 text-sm">Preview Optimized</span>
                    <span className="text-green-400 font-semibold">{analytics.previewOptimizedRate}%</span>
                  </div>
                  
                  <div className="py-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-light-100/70 text-sm">Character Efficiency</span>
                      <span className="text-light-100 font-semibold">{analytics.characterEfficiency}%</span>
                    </div>
                    <div className="w-full bg-dark-300 rounded-full h-2">
                      <div 
                        className="bg-blue-300 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(analytics.characterEfficiency, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips and Guidelines */}
            <Card className="bg-dark-100 border-white/10">
              <CardHeader className="pb-4">
                <CardTitle className="text-light-100">Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <span className="text-light-100/80">Keep preview under 58 characters for full visibility</span>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <UserCheck className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-light-100/80">Personalize with recipient's name or company</span>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Target className="w-4 h-4 text-blue-300 mt-0.5 flex-shrink-0" />
                    <span className="text-light-100/80">Be specific about your value proposition</span>
                  </div>
                  
                  <div className="flex items-start space-x-2">
                    <Clock className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                    <span className="text-light-100/80">End with a clear call-to-action</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Copy Success Toast */}
      {isSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Message copied to clipboard!</span>
          </div>
        </div>
      )}

      {/* Copy Error Toast */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50">
          <div className="flex items-center space-x-2">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <span>{error}</span>
          </div>
        </div>
      )}
    </div>
  );
}
