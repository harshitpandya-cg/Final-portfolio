import React, { useState } from 'react';

/**
 * Reusable Image with Fallback
 */
export const SafeImage = ({
  src,
  alt = '',
  className = '',
  aspectRatio = '16/10',
  objectFit = 'cover',
  objectPosition = 'top',
  loading = 'lazy',
  priority = false,
  fallbackText = 'HP',
  style = {},
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full flex flex-col items-center justify-center bg-[#0B0B08]/10 text-[#8A8880] select-none ${className}`}
        style={{ aspectRatio: aspectRatio || undefined, ...style }}
      >
        <div className="w-10 h-10 rounded-lg border border-[#8A8880]/30 flex items-center justify-center font-mono text-xs font-bold text-[#F0552D]">
          {fallbackText.slice(0, 2).toUpperCase()}
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest mt-2 text-[#8A8880]">
          {alt || 'Preview unavailable'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : loading}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      onError={() => setHasError(true)}
      className={className}
      style={{
        aspectRatio: aspectRatio || undefined,
        objectFit,
        objectPosition,
        ...style,
      }}
    />
  );
};

/**
 * BrowserFrame for Project Screenshots
 */
export const BrowserFrame = ({
  src,
  alt = '',
  domain = 'preview.local',
  variant = 'paper', // 'paper' | 'ink'
  className = '',
  priority = false,
  aspectRatio = '16/10',
  objectFit = 'cover',
  imageClassName = 'w-full h-auto block',
  imageStyle = {},
  maxHeight,
  style = {},
}) => {
  const isPaper = variant === 'paper';
  const borderClass = isPaper ? 'border-[#0B0B08]/15' : 'border-[#E6E4DE]/15';
  const barBgClass = isPaper ? 'bg-[#0B0B08]/[0.04]' : 'bg-[#E6E4DE]/[0.04]';
  const textClass = isPaper ? 'text-[#0B0B08]/60' : 'text-[#E6E4DE]/60';
  const dotBorderClass = isPaper ? 'border-[#0B0B08]/30' : 'border-[#E6E4DE]/30';

  return (
    <div
      style={{ maxHeight, ...style }}
      className={`rounded-xl border ${borderClass} overflow-hidden shadow-lg transition-all duration-300 flex flex-col ${className}`}
    >
      {/* Top Browser Bar */}
      <div
        className={`px-3 py-2 border-b ${borderClass} ${barBgClass} flex items-center justify-between select-none shrink-0`}
      >
        <div className="flex items-center gap-1.5">
          <div className={`w-2.5 h-2.5 rounded-full border ${dotBorderClass} bg-[#F0552D]/60`} />
          <div className={`w-2.5 h-2.5 rounded-full border ${dotBorderClass} bg-[#8A8880]/40`} />
          <div className={`w-2.5 h-2.5 rounded-full border ${dotBorderClass} bg-[#8A8880]/40`} />
        </div>

        <div className={`font-mono text-[10px] tracking-wider uppercase truncate px-2 ${textClass}`}>
          {domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </div>

        <div className="w-10 flex justify-end">
          <div className="w-1.5 h-1.5 rounded-full bg-[#8A8880]/40" />
        </div>
      </div>

      {/* Frame Screen */}
      <div className={`w-full overflow-hidden flex-1 flex items-center justify-center ${isPaper ? 'bg-[#0B0B08]/5' : 'bg-[#0B0B08]'}`}>
        <SafeImage
          src={src}
          alt={alt}
          aspectRatio={aspectRatio}
          objectFit={objectFit}
          objectPosition={objectFit === 'contain' ? 'center' : 'top'}
          className={imageClassName}
          style={imageStyle}
          priority={priority}
          fallbackText={domain}
        />
      </div>
    </div>
  );
};

/**
 * PhotoFrame for Personal / Profile Headshot
 */
export const PhotoFrame = ({
  src,
  alt = 'Harshit Pandya',
  caption = 'HP — Gandhinagar',
  className = '',
}) => {
  return (
    <div className={`relative group ${className}`}>
      {/* 4 Coral Corner Crop-Marks */}
      <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#F0552D] z-10" />
      <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#F0552D] z-10" />
      <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#F0552D] z-10" />
      <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#F0552D] z-10" />

      {/* Outer Border Box */}
      <div className="rounded-2xl border border-[#0B0B08]/15 overflow-hidden bg-[#0B0B08]/5 shadow-lg">
        <SafeImage
          src={src}
          alt={alt}
          aspectRatio="4/5"
          objectFit="cover"
          objectPosition="center top"
          className="w-full h-auto block transition-transform duration-500"
          fallbackText="HP"
        />
      </div>

      {/* Mono Caption Below */}
      <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#0B0B08]/60">
        <span className="text-[#F0552D] font-bold">PORTRAIT // 01</span>
        <span>{caption}</span>
      </div>
    </div>
  );
};

/**
 * CertificateFrame for Verified Honors & Credentials
 */
export const CertificateFrame = ({
  src,
  alt = '',
  index = '01',
  title = '',
  year = '',
  organization = '',
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`group rounded-xl border border-[#0B0B08]/15 bg-[#E6E4DE] p-4 flex flex-col justify-between hover:border-[#F0552D] transition-colors duration-300 cursor-pointer shadow-sm ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between font-mono text-[10px] text-[#0B0B08]/60 uppercase tracking-widest mb-3">
        <span className="text-[#F0552D] font-bold">{index}</span>
        <span>{year}</span>
      </div>

      {/* Certificate Image (Contained on neutral background so it never crops) */}
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-[#0B0B08] border border-[#0B0B08]/10 flex items-center justify-center p-1 mb-4">
        <SafeImage
          src={src}
          alt={alt || title}
          aspectRatio="4/3"
          objectFit="contain"
          className="w-full h-full block group-hover:scale-[1.02] transition-transform duration-500"
          fallbackText={title}
        />
        <div className="absolute inset-0 bg-[#0B0B08]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="font-mono text-[10px] uppercase tracking-widest bg-[#E6E4DE] text-[#0B0B08] px-3 py-1 rounded-full shadow-lg font-bold">
            Expand View ↗
          </span>
        </div>
      </div>

      {/* Caption & Org */}
      <div>
        <h4 className="font-bold text-sm text-[#0B0B08] group-hover:text-[#F0552D] transition-colors truncate">
          {title}
        </h4>
        <p className="font-mono text-[10px] uppercase tracking-wider text-[#0B0B08]/60 truncate mt-0.5">
          {organization}
        </p>
      </div>
    </div>
  );
};
