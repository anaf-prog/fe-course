const ACADPalette = ({ currentStep, animationSteps, dotPos, isMobile }) => {
  return (
    <div className={`${isMobile ? 'w-full' : 'lg:w-1/4'} p-3 sm:p-6 ${isMobile ? 'border-t' : 'border-l'} border-gray-800 bg-gray-900/50`}>
      {isMobile ? (
        // Mobile layout - more compact
        <div className="space-y-4">
          <h3 className="text-cyan-300 font-mono mb-2 text-sm border-b border-gray-800 pb-2">
            Tool Palette
          </h3>
          
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 hover:bg-gray-800/50 rounded cursor-pointer">
              <div className="w-6 h-6 border border-cyan-500 rounded flex items-center justify-center">
                <div className="w-3 h-0.5 bg-cyan-400"></div>
              </div>
              <span className="text-gray-300 text-xs">Line</span>
            </div>
            
            <div className="flex items-center gap-2 p-2 hover:bg-gray-800/50 rounded cursor-pointer">
              <div className="w-6 h-6 border border-green-500 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 border border-green-400 rounded-full"></div>
              </div>
              <span className="text-gray-300 text-xs">Circle</span>
            </div>
            
            <div className="flex items-center gap-2 p-2 hover:bg-gray-800/50 rounded cursor-pointer">
              <div className="w-6 h-6 border border-yellow-500 rounded flex items-center justify-center">
                <div className="w-4 h-4 border border-yellow-400"></div>
              </div>
              <span className="text-gray-300 text-xs">Rectangle</span>
            </div>
            
            <div className="flex items-center gap-2 p-2 hover:bg-gray-800/50 rounded cursor-pointer">
              <div className="w-6 h-6 border border-purple-500 rounded flex items-center justify-center">
                <div className="w-3 h-0.5 bg-purple-400 rotate-45"></div>
                <div className="w-3 h-0.5 bg-purple-400 -rotate-45"></div>
              </div>
              <span className="text-gray-300 text-xs">Dimension</span>
            </div>
          </div>

          {/* Mobile Info Row */}
          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-800">
            <div className="space-y-1">
              <h4 className="text-cyan-300 font-mono mb-1 text-xs">Drawing Info</h4>
              <div className="text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                  <span>Rect:</span>
                  <span className="text-green-300">200x200</span>
                </div>
                <div className="flex justify-between">
                  <span>Radius:</span>
                  <span className="text-cyan-300">80.00</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-cyan-300 font-mono mb-1 text-xs">Progress</h4>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / animationSteps.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-cyan-300 text-xs font-mono">
                  {Math.round((currentStep / animationSteps.length) * 100)}%
                </span>
              </div>
              <div className="text-gray-400 text-xs mt-1">
                {currentStep < animationSteps.length ? 
                  `Step ${currentStep + 1} of ${animationSteps.length}` : 
                  'Complete'}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Desktop layout
        <>
          <h3 className="text-cyan-300 font-mono mb-4 text-sm border-b border-gray-800 pb-2">
            Tool Palette
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded cursor-pointer">
              <div className="w-8 h-8 border border-cyan-500 rounded flex items-center justify-center">
                <div className="w-4 h-0.5 bg-cyan-400"></div>
              </div>
              <span className="text-gray-300 text-sm">Line</span>
            </div>
            
            <div className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded cursor-pointer">
              <div className="w-8 h-8 border border-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 border border-green-400 rounded-full"></div>
              </div>
              <span className="text-gray-300 text-sm">Circle</span>
            </div>
            
            <div className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded cursor-pointer">
              <div className="w-8 h-8 border border-yellow-500 rounded flex items-center justify-center">
                <div className="w-5 h-5 border border-yellow-400"></div>
              </div>
              <span className="text-gray-300 text-sm">Rectangle</span>
            </div>
            
            <div className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded cursor-pointer">
              <div className="w-8 h-8 border border-purple-500 rounded flex items-center justify-center">
                <div className="w-4 h-1 bg-purple-400 rotate-45"></div>
                <div className="w-4 h-1 bg-purple-400 -rotate-45"></div>
              </div>
              <span className="text-gray-300 text-sm">Dimension</span>
            </div>
          </div>

          {/* Drawing Info */}
          <div className="mt-8 pt-4 border-t border-gray-800">
            <h4 className="text-cyan-300 font-mono mb-3 text-sm">Drawing Info</h4>
            <div className="text-xs text-gray-400 space-y-2">
              <div className="flex justify-between">
                <span>Rectangle:</span>
                <span className="text-green-300">200x200</span>
              </div>
              <div className="flex justify-between">
                <span>Circle Radius:</span>
                <span className="text-cyan-300">80.00</span>
              </div>
              <div className="flex justify-between">
                <span>Center Point:</span>
                <span className="text-yellow-300">400,300</span>
              </div>
              <div className="flex justify-between">
                <span>Area:</span>
                <span className="text-purple-300">68,541.59</span>
              </div>
            </div>
          </div>
          
          {/* Animation Progress */}
          <div className="mt-6">
            <div className="text-xs text-gray-400 mb-2">Animation Progress</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / animationSteps.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-cyan-300 text-xs font-mono">
                {Math.round((currentStep / animationSteps.length) * 100)}%
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ACADPalette

// const ACADPalette = ({ currentStep, animationSteps, dotPos }) => {
//   return (
//     <div className="lg:w-1/4 p-6 border-l border-gray-800 bg-gray-900/50">
//       <h3 className="text-cyan-300 font-mono mb-4 text-sm border-b border-gray-800 pb-2">
//         Tool Palette
//       </h3>
      
//       <div className="space-y-3">
//         <div className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded cursor-pointer">
//           <div className="w-8 h-8 border border-cyan-500 rounded flex items-center justify-center">
//             <div className="w-4 h-0.5 bg-cyan-400"></div>
//           </div>
//           <span className="text-gray-300 text-sm">Line</span>
//         </div>
        
//         <div className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded cursor-pointer">
//           <div className="w-8 h-8 border border-green-500 rounded-full flex items-center justify-center">
//             <div className="w-3 h-3 border border-green-400 rounded-full"></div>
//           </div>
//           <span className="text-gray-300 text-sm">Circle</span>
//         </div>
        
//         <div className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded cursor-pointer">
//           <div className="w-8 h-8 border border-yellow-500 rounded flex items-center justify-center">
//             <div className="w-5 h-5 border border-yellow-400"></div>
//           </div>
//           <span className="text-gray-300 text-sm">Rectangle</span>
//         </div>
        
//         <div className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded cursor-pointer">
//           <div className="w-8 h-8 border border-purple-500 rounded flex items-center justify-center">
//             <div className="w-4 h-1 bg-purple-400 rotate-45"></div>
//             <div className="w-4 h-1 bg-purple-400 -rotate-45"></div>
//           </div>
//           <span className="text-gray-300 text-sm">Dimension</span>
//         </div>
//       </div>

//       {/* Drawing Info */}
//       <div className="mt-8 pt-4 border-t border-gray-800">
//         <h4 className="text-cyan-300 font-mono mb-3 text-sm">Drawing Info</h4>
//         <div className="text-xs text-gray-400 space-y-2">
//           <div className="flex justify-between">
//             <span>Rectangle:</span>
//             <span className="text-green-300">200x200</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Circle Radius:</span>
//             <span className="text-cyan-300">80.00</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Center Point:</span>
//             <span className="text-yellow-300">400,300</span>
//           </div>
//           <div className="flex justify-between">
//             <span>Area:</span>
//             <span className="text-purple-300">68,541.59</span>
//           </div>
//         </div>
//       </div>
      
//       {/* Animation Progress */}
//       <div className="mt-6">
//         <div className="text-xs text-gray-400 mb-2">Animation Progress</div>
//         <div className="flex items-center gap-2">
//           <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-gradient-to-r from-cyan-500 to-green-500 rounded-full transition-all duration-300"
//               style={{ width: `${(currentStep / animationSteps.length) * 100}%` }}
//             ></div>
//           </div>
//           <span className="text-cyan-300 text-xs font-mono">
//             {Math.round((currentStep / animationSteps.length) * 100)}%
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ACADPalette