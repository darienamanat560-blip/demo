#!/bin/bash

# Replace all black logo boxes (w-10 h-10)
sed -i 's|<div className="w-10 h-10 bg-black flex items-center justify-center">\s*<span className="text-white text-\[10px\] font-mono font-bold tracking-wider">t\.c\.</span>\s*</div>|<div className="w-10 h-10 flex items-center justify-center"><img src="/vial-logo.png" alt="truechem" className="w-full h-full object-contain" /></div>|g' truechem.jsx

# Replace white background logos (w-10 h-10)
sed -i 's|<div className="w-10 h-10 bg-white flex items-center justify-center">\s*<span className="text-black text-\[10px\] font-mono font-bold tracking-wider">t\.c\.</span>\s*</div>|<div className="w-10 h-10 flex items-center justify-center"><img src="/vial-logo.png" alt="truechem" className="w-full h-full object-contain invert" /></div>|g' truechem.jsx

# Replace larger logos (w-16 h-16)
sed -i 's|<div className="w-16 h-16 bg-black mx-auto flex items-center justify-center mb-4">\s*<span className="text-white text-lg font-mono font-bold tracking-wider">t\.c\.</span>\s*</div>|<div className="w-16 h-16 mx-auto flex items-center justify-center mb-4"><img src="/vial-logo.png" alt="truechem" className="w-full h-full object-contain" /></div>|g' truechem.jsx

# Replace w-16 h-16 mb-6 variant
sed -i 's|<div className="w-16 h-16 bg-black mx-auto mb-6 flex items-center justify-center">\s*<span className="text-white text-lg font-mono font-bold tracking-wider">t\.c\.</span>\s*</div>|<div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center"><img src="/vial-logo.png" alt="truechem" className="w-full h-full object-contain" /></div>|g' truechem.jsx

# Replace tiny logos (w-6 h-6)
sed -i 's|<div className="w-6 h-6 bg-black flex items-center justify-center">\s*<span className="text-white text-\[8px\] font-mono font-bold tracking-wide">t\.c\.</span>\s*</div>|<div className="w-6 h-6 flex items-center justify-center"><img src="/vial-logo.png" alt="truechem" className="w-full h-full object-contain" /></div>|g' truechem.jsx

# Replace medium logos (w-14 h-14)
sed -i 's|<div className="w-14 h-14 bg-black flex items-center justify-center flex-shrink-0">\s*<span className="text-white text-\[11px\] font-mono font-bold tracking-wider">t\.c\.</span>\s*</div>|<div className="w-14 h-14 flex items-center justify-center flex-shrink-0"><img src="/vial-logo.png" alt="truechem" className="w-full h-full object-contain" /></div>|g' truechem.jsx

