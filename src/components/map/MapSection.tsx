import { ExternalLink, Maximize2, Navigation, MapPin } from "lucide-react"
import { useState } from "react"

const MapSection = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Koordinat Indonesian Drafting School
  const latitude = -6.260654361292918
  const longitude = 107.11650327453172
  const placeName = "Indonesian+Drafting+School"
  
  // URL embed dari iframe
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3589.044568446173!2d107.11650327453172!3d-6.260654361292918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69856dd79e4a09%3A0xa0f59279de47d841!2sIndonesian%20Drafting%20School!5e1!3m2!1sid!2sid!4v1767886187255!5m2!1sid!2sid"

  const handleOpenGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`, '_blank')
  }

  const handleOpenDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`, '_blank')
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-[#030712]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
            Lokasi <span className="text-[#FF6C37]">Indonesian Drafting School</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto px-2">
            Temukan kami dengan mudah di Google Maps
          </p>
        </div>

        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-3 sm:p-4 md:p-6">
          {/* Container Peta */}
          <div className={`relative ${isExpanded ? 'fixed inset-0 z-50' : 'rounded-lg sm:rounded-xl overflow-hidden'}`}>
            {isExpanded ? (
              <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
                <div className="flex justify-between items-center p-4 md:p-6 bg-[#1a1a2e] border-b border-[#FF6C37]/30">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white text-lg md:text-2xl font-bold truncate">Indonesian Drafting School</h3>
                    <p className="text-[#FF6C37] text-sm md:text-base">Peta Lokasi Kami</p>
                  </div>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="flex-shrink-0 text-white hover:text-[#FF6C37] p-2 ml-2 rounded-lg hover:bg-gray-800/50 transition-colors border border-gray-700 hover:border-[#FF6C37]/30"
                    aria-label="Tutup mode penuh"
                  >
                    <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex-1">
                  <iframe
                    src={mapEmbedUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Indonesian Drafting School - Google Maps"
                  />
                </div>
              </div>
            ) : (
              <>
                <iframe
                  src={mapEmbedUrl}
                  className="w-full h-[300px] sm:h-[350px] md:aspect-[21/9] rounded-lg sm:rounded-xl"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Indonesian Drafting School"
                />
                
                {/* Overlay untuk efek interaktif */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 via-40% to-transparent pointer-events-none rounded-lg sm:rounded-xl" />
                
                {/* Grid efek samping */}
                <div className="absolute inset-0 pointer-events-none rounded-lg sm:rounded-xl" 
                  style={{
                    backgroundImage: `linear-gradient(90deg, transparent 50%, rgba(255, 108, 55, 0.03) 50%)`,
                    backgroundSize: '4rem 100%',
                  }}
                />
              </>
            )}
          </div>

          {/* Tombol-tombol untuk mobile - direorganisasi */}
          <div className="flex flex-col sm:hidden gap-3 mt-4">
            {/* Info lokasi untuk mobile */}
            <div className="bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-sm text-white p-3 rounded-lg border border-[#FF6C37]/20">
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-4 h-4 text-[#FF6C37] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-1 truncate">
                    <span className="bg-gradient-to-r from-[#FF6C37] to-[#FF8C42] bg-clip-text text-transparent">
                      Indonesian Drafting School
                    </span>
                  </h3>
                  <p className="text-xs text-gray-300 leading-tight">
                    Ruko Telaga Pesona L10/12, Telagamurni
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-[#FF6C37]/20 text-[#FF8C42] rounded text-xs font-medium border border-[#FF6C37]/20">
                  Pendidikan
                </span>
                <span className="px-2 py-0.5 bg-[#FF8C42]/20 text-[#FFA726] rounded text-xs font-medium border border-[#FF8C42]/20">
                  Kursus
                </span>
                <span className="px-2 py-0.5 bg-[#E55A2B]/20 text-[#FF6C37] rounded text-xs font-medium border border-[#E55A2B]/20">
                  CAD/Drafter
                </span>
              </div>
            </div>

            {/* Container tombol aksi mobile */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleOpenDirections}
                className="bg-gradient-to-r from-[#FF5500] to-[#FF5500] text-white px-3 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:from-[#E55A2B] hover:to-[#FF5500] transition-all duration-300 active:scale-95"
              >
                <Navigation className="w-4 h-4" />
                <span className="text-xs">Petunjuk Arah</span>
              </button>

              <button
                onClick={handleOpenGoogleMaps}
                className="bg-gradient-to-r from-[#FF5500] to-[#FF5500] text-white px-3 py-2.5 rounded-lg font-bold flex items-center justify-center gap-2 hover:from-[#E55A2B] hover:to-[#FF5500] transition-all duration-300 active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-xs">Buka Maps</span>
              </button>
            </div>
          </div>

          {/* Tombol untuk desktop */}
          <div className="hidden sm:block">
            {/* Tombol untuk membuka Google Maps */}
            <button
              onClick={handleOpenGoogleMaps}
              className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-gradient-to-r from-[#FF5500] to-[#FF5500] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold flex items-center gap-2 hover:from-[#E55A2B] hover:to-[#FF5500] transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_30px_rgba(255,108,55,0.4)] hover:shadow-[0_0_50px_rgba(255,108,55,0.6)] group"
            >
              <span>Buka di Google Maps</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            {/* Tombol Petunjuk Arah */}
            <button
              onClick={handleOpenDirections}
              className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-gradient-to-r from-[#FF5500] to-[#FF5500] text-white px-4 py-2 md:px-6 md:py-3 rounded-lg font-bold flex items-center gap-2 hover:from-[#FF6C37] hover:to-[#FF5500] transition-all duration-300 transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(255,140,66,0.3)] hover:shadow-[0_0_40px_rgba(255,140,66,0.5)] group"
            >
              <Navigation className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
              <span className="text-sm md:text-base">Petunjuk Arah</span>
            </button>

            {/* Tombol Zoom/Perbesar */}
            <button
              onClick={() => setIsExpanded(true)}
              className="absolute top-4 right-4 md:top-6 md:right-20 bg-gradient-to-br from-[#FF6C37]/20 to-[#FF8C42]/10 backdrop-blur-sm text-[#FF6C37] p-2 md:p-3 rounded-full border border-[#FF6C37]/30 hover:border-[#FF6C37]/50 hover:from-[#FF6C37]/30 hover:to-[#FF8C42]/20 transition-all duration-300 transform hover:scale-110 group shadow-lg"
              aria-label="Perbesar peta"
            >
              <Maximize2 className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform" />
              <div className="absolute inset-0 rounded-full bg-[#FF6C37]/10 blur-sm group-hover:bg-[#FF6C37]/20 transition-colors" />
            </button>

            {/* Info lokasi - desktop */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-gradient-to-br from-gray-900/90 to-gray-950/90 backdrop-blur-sm text-white p-3 md:p-4 rounded-xl max-w-[200px] md:max-w-xs border border-[#FF6C37]/20 shadow-2xl">
              <h3 className="font-bold text-sm md:text-lg mb-1 md:mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#FF6C37] flex-shrink-0" />
                <span className="bg-gradient-to-r from-[#FF6C37] to-[#FF8C42] bg-clip-text text-transparent">
                  Indonesian Drafting School
                </span>
              </h3>
              <p className="text-xs md:text-sm text-gray-300 leading-tight">
                Ruko Telaga Pesona L10/12, Telagamurni<br/>
                Kec. Cikarang Barat, Kabupaten Bekasi<br/>
                Jawa Barat 17530
              </p>
              <div className="mt-2 md:mt-3 flex flex-wrap gap-1">
                <span className="px-2 py-0.5 md:px-2 md:py-1 bg-[#FF6C37]/20 text-[#FF8C42] rounded text-xs font-medium border border-[#FF6C37]/20">
                  Pendidikan
                </span>
                <span className="px-2 py-0.5 md:px-2 md:py-1 bg-[#FF8C42]/20 text-[#FFA726] rounded text-xs font-medium border border-[#FF8C42]/20">
                  Kursus
                </span>
                <span className="px-2 py-0.5 md:px-2 md:py-1 bg-[#E55A2B]/20 text-[#FF6C37] rounded text-xs font-medium border border-[#E55A2B]/20">
                  CAD/Drafter
                </span>
              </div>
              <div className="absolute -bottom-2 left-1/4 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-[#FF6C37] to-transparent rounded-full" />
            </div>
          </div>

          {/* Marker glow effect */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden sm:block">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#FF6C37]/20 rounded-full blur-md animate-pulse" />
              <div className="w-6 h-6 bg-gradient-to-br from-[#FF6C37] to-[#FF8C42] rounded-full border-2 border-white shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection