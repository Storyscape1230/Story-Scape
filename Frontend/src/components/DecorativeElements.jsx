function DecorativeElements() {
  return (
    <>
      {/* Top left red dot */}
      <div className="fixed top-20 left-10 w-24 h-24 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      
      {/* Top right pink dot */}
      <div className="fixed top-32 right-20 w-20 h-20 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      
      {/* Middle left red dot */}
      <div className="fixed top-1/2 left-1/4 w-28 h-28 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      
      {/* Middle right pink dot */}
      <div className="fixed top-1/2 right-1/4 w-24 h-24 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      
      {/* Bottom left pink dot */}
      <div className="fixed bottom-32 left-20 w-20 h-20 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
      
      {/* Bottom right red dot */}
      <div className="fixed bottom-20 right-10 w-28 h-28 bg-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
    </>
  );
}

export default DecorativeElements; 