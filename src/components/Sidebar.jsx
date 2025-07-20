import { X, Filter, RefreshCw } from 'lucide-react'

const Sidebar = ({ isOpen, onClose, popularInterests, selectedInterests, onInterestToggle, loadingInterests }) => {

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside className={`fixed lg:static top-20 lg:top-0 left-0 h-[calc(100vh-80px)] lg:h-full w-80 bg-primary-secondary border-r border-border transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-end p-6">
            <button 
              className="bg-transparent border-none text-text-secondary cursor-pointer p-2 rounded-lg transition-all duration-300 hover:bg-accent-cyan/10 hover:text-accent-cyan lg:hidden"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          {/* Interest Selection */}
          <div className="flex-1 p-6">
            <h3 className="flex items-center gap-2 text-text-primary font-semibold mb-4">
              <Filter size={16} />
              Interests
            </h3>
            <p className="text-text-muted text-sm mb-6">Choose one interest to see personalized articles</p>
            
            {/* Scrollable Interests Container */}
            <div className="max-h-96 overflow-y-auto scrollbar-thin">
              <div className="space-y-3 pb-4">
                {loadingInterests ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw size={20} className="animate-spin text-accent-cyan" />
                    <span className="ml-3 text-text-secondary">Loading interests...</span>
                  </div>
                ) : popularInterests.length > 0 ? (
                  popularInterests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => onInterestToggle(interest)}
                      className={`w-full flex items-center gap-3 p-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedInterests.includes(interest)
                          ? 'bg-accent-cyan text-primary-bg shadow-lg'
                          : 'bg-primary-card text-text-secondary hover:bg-accent-cyan/10 hover:text-accent-cyan hover:shadow-md'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full ${
                        selectedInterests.includes(interest) ? 'bg-primary-bg' : 'bg-accent-cyan'
                      }`}></div>
                      <span className="capitalize font-medium">{interest}</span>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-8 text-text-muted">
                    <Filter className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No interests available</p>
                  </div>
                )}
              </div>
            </div>
          </div>


        </div>
      </aside>
    </>
  )
}

export default Sidebar 