import { useState, useCallback, useEffect, useRef } from 'react';
import Icon from '@components/ui/Icon';
import { cn } from '@lib/utils/cn';
import { mockMedia } from '@lib/mocks/media';
import { formatDuration } from '@lib/utils/formatters';
import type { Platform } from '@lib/utils/constants';

const PLATFORM_CONFIG: { id: Platform; label: string; icon: string }[] = [
  { id: 'tiktok', label: 'TikTok', icon: 'play_circle' },
  { id: 'instagram', label: 'Instagram', icon: 'photo_camera' },
  { id: 'facebook', label: 'Facebook', icon: 'social_leaderboard' },
  { id: 'youtube', label: 'YouTube', icon: 'smart_display' },
];

const PUBLISH_STEPS = [
  'Compressing video…',
  'Uploading to CDN…',
  'Distributing to platforms…',
  'Verifying publication…',
] as const;

const SCHEDULE_STEPS = [
  'Validating content…',
  'Reserving time slot…',
  'Queuing for distribution…',
  'Confirming schedule…',
] as const;

type OverlayMode = 'publish' | 'schedule' | null;

const AI_GENERATED_CAPTION =
  'Behind the scenes of our latest creative shoot. The energy on set was unreal — every frame tells a story. Stay tuned for the full drop this week.';

const AI_GENERATED_TAGS = ['#behindthescenes', '#creative', '#contentcreator', '#viral', '#newdrop'];

interface AiScoreFactor {
  label: string;
  score: number;
  icon: string;
  verdict: string;
}

const AI_SCORE_FACTORS: AiScoreFactor[] = [
  { label: 'Hook Strength', score: 92, icon: 'local_fire_department', verdict: 'Great opening — grabs attention in under 2s' },
  { label: 'Trend Alignment', score: 78, icon: 'trending_up', verdict: 'Matches 3 trending topics this week' },
  { label: 'Audience Fit', score: 85, icon: 'groups', verdict: 'Strong match with your follower demographics' },
  { label: 'Posting Time', score: 64, icon: 'schedule', verdict: 'Consider posting between 6–8 PM for higher reach' },
];

const MAX_CAPTION_LENGTH = 2200;
const selectedMedia = mockMedia[0]!;

interface PostEditorPageProps {
  showMedia?: boolean;
}

function PostEditorPage({ showMedia = true }: PostEditorPageProps): React.JSX.Element {
  const [caption, setCaption] = useState('');
  const [hashtags, setHashtags] = useState<string[]>(showMedia ? ['#creative', '#motiondesign', '#vfx'] : []);
  const [newTag, setNewTag] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);
  const [platforms, setPlatforms] = useState<Platform[]>(['tiktok']);
  const [publishNow, setPublishNow] = useState(true);
  const [scheduleDate, setScheduleDate] = useState('2023-10-24');
  const [scheduleTime, setScheduleTime] = useState('20:00');
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; url: string } | null>(null);
  const uploadedUrlRef = useRef<string | null>(null);
  const [overlayMode, setOverlayMode] = useState<OverlayMode>(null);
  const [overlayStep, setOverlayStep] = useState(0);
  const [overlayDone, setOverlayDone] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiTagIndex, setAiTagIndex] = useState(0);
  const aiTypingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [aiScoreVisible, setAiScoreVisible] = useState(false);
  const [aiScoreLoading, setAiScoreLoading] = useState(false);
  const [aiScoreFactorIndex, setAiScoreFactorIndex] = useState(0);

  const togglePlatform = useCallback((platform: Platform) => {
    setPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform],
    );
  }, []);

  const addTag = useCallback(() => {
    const tag = newTag.startsWith('#') ? newTag : `#${newTag}`;
    if (tag.length > 1 && !hashtags.includes(tag)) {
      setHashtags((prev) => [...prev, tag]);
    }
    setNewTag('');
    setShowTagInput(false);
  }, [newTag, hashtags]);

  const removeTag = useCallback((tag: string) => {
    setHashtags((prev) => prev.filter((t) => t !== tag));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) {
      if (uploadedUrlRef.current) {
        URL.revokeObjectURL(uploadedUrlRef.current);
      }
      const url = URL.createObjectURL(file);
      uploadedUrlRef.current = url;
      setUploadedFile({ name: file.name, url });
      if (!showMedia) {
        setAiGenerating(true);
        setCaption('');
        setHashtags([]);
        setAiTagIndex(0);
      }
    }
  }, [showMedia]);

  // AI typing effect for caption
  useEffect(() => {
    if (!aiGenerating) return;

    let charIndex = 0;
    const typeNext = (): void => {
      if (charIndex < AI_GENERATED_CAPTION.length) {
        charIndex++;
        setCaption(AI_GENERATED_CAPTION.slice(0, charIndex));
        aiTypingRef.current = setTimeout(typeNext, 25);
      }
    };

    // Start typing after a brief "analyzing" delay
    const startDelay = setTimeout(typeNext, 800);
    return () => {
      clearTimeout(startDelay);
      if (aiTypingRef.current) clearTimeout(aiTypingRef.current);
    };
  }, [aiGenerating]);

  // AI tag generation — staggered after caption is done
  useEffect(() => {
    if (!aiGenerating) return;
    if (caption !== AI_GENERATED_CAPTION) return;
    if (aiTagIndex >= AI_GENERATED_TAGS.length) {
      setAiGenerating(false);
      setAiScoreVisible(true);
      setAiScoreLoading(true);
      setAiScoreFactorIndex(0);
      return;
    }

    const timer = setTimeout(() => {
      setHashtags((prev) => [...prev, AI_GENERATED_TAGS[aiTagIndex]!]);
      setAiTagIndex((i) => i + 1);
    }, 300);
    return () => clearTimeout(timer);
  }, [aiGenerating, caption, aiTagIndex]);

  // AI score — loading phase then staggered reveal
  useEffect(() => {
    if (!aiScoreVisible || !aiScoreLoading) return;

    const timer = setTimeout(() => {
      setAiScoreLoading(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [aiScoreVisible, aiScoreLoading]);

  useEffect(() => {
    if (!aiScoreVisible || aiScoreLoading) return;
    if (aiScoreFactorIndex >= AI_SCORE_FACTORS.length) return;

    const timer = setTimeout(() => {
      setAiScoreFactorIndex((i) => i + 1);
    }, 600);
    return () => clearTimeout(timer);
  }, [aiScoreVisible, aiScoreLoading, aiScoreFactorIndex]);

  useEffect(() => {
    return () => {
      if (uploadedUrlRef.current) {
        URL.revokeObjectURL(uploadedUrlRef.current);
      }
    };
  }, []);

  const hasMedia = showMedia || uploadedFile;

  const startOverlay = useCallback((mode: 'publish' | 'schedule') => {
    setOverlayMode(mode);
    setOverlayStep(0);
    setOverlayDone(false);
  }, []);

  useEffect(() => {
    if (!overlayMode) return;
    const steps = overlayMode === 'publish' ? PUBLISH_STEPS : SCHEDULE_STEPS;
    if (overlayStep < steps.length) {
      const timer = setTimeout(() => setOverlayStep((s) => s + 1), 1200);
      return () => clearTimeout(timer);
    }
    const doneTimer = setTimeout(() => setOverlayDone(true), 600);
    return () => clearTimeout(doneTimer);
  }, [overlayMode, overlayStep]);

  return (
    <div className="grid h-full w-full grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left Column: Video Preview / Drop Zone */}
      <div className="flex min-h-0 flex-col gap-6 lg:col-span-7">
        {hasMedia ? (
          <>
            {/* Video Player */}
            <div className="glass group relative min-h-0 flex-1 cursor-pointer overflow-hidden rounded-2xl">
          {uploadedFile ? (
            <div className="flex h-full items-center justify-center bg-black/40">
              <video
                src={uploadedFile.url}
                className="h-full w-full object-contain"
                controls
                aria-label="Uploaded video preview"
              />
            </div>
          ) : (
            <img
              src={selectedMedia.thumbnailUrl}
              alt={selectedMedia.title}
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
          )}
          {/* Gradient overlay with controls */}
          {!uploadedFile ? (
          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="bg-accent-lime text-bg-primary flex h-12 w-12 items-center justify-center rounded-full transition-transform active:scale-90"
                  aria-label="Play video"
                >
                  <Icon name="play_arrow" filled />
                </button>
                <div className="h-1 w-48 overflow-hidden rounded-full bg-zinc-700">
                  <div className="bg-accent-lime h-full w-1/3" />
                </div>
                <span className="font-mono text-xs text-zinc-300">
                  00:14 / {formatDuration(selectedMedia.duration)}
                </span>
              </div>
              <button
                type="button"
                className="glass rounded-lg p-2 transition-colors hover:text-accent-lime"
                aria-label="Fullscreen"
              >
                <Icon name="fullscreen" />
              </button>
            </div>
          </div>
          ) : null}
          {/* HD Preview badge */}
          {!uploadedFile ? (
          <div className="absolute left-6 top-6">
            <div className="bg-accent-lime/20 border-accent-lime/30 text-accent-lime flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold backdrop-blur-md">
              <span className="bg-accent-lime h-2 w-2 animate-pulse rounded-full" />
              HD PREVIEW
            </div>
          </div>
          ) : null}
        </div>

        {/* Thumbnail strip */}
        <div className="grid shrink-0 grid-cols-4 gap-4">
          <div className="border-accent-lime aspect-square overflow-hidden rounded-xl border bg-zinc-900 p-1">
            {uploadedFile ? (
              <video
                src={uploadedFile.url}
                className="h-full w-full rounded-lg object-cover"
                muted
              />
            ) : (
              <img
                className="h-full w-full rounded-lg object-cover"
                src={selectedMedia.thumbnailUrl}
                alt={`${selectedMedia.title} thumbnail`}
              />
            )}
          </div>
          <button
            type="button"
            className="flex aspect-square items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 transition-colors hover:border-zinc-600"
            aria-label="Add media"
          >
            <Icon name="add" className="text-zinc-600" />
          </button>
        </div>
          </>
        ) : (
          /* Drop Zone */
          <div
            className={cn(
              'glass flex min-h-0 flex-1 cursor-pointer flex-col items-center justify-center gap-6 rounded-2xl border-2 border-dashed p-12 transition-all',
              isDragOver
                ? 'border-accent-lime bg-accent-lime/5 scale-[1.01]'
                : 'border-zinc-700 hover:border-zinc-500',
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            role="button"
            tabIndex={0}
            aria-label="Drop zone for media upload"
          >
            <div
              className={cn(
                'flex h-20 w-20 items-center justify-center rounded-2xl transition-colors',
                isDragOver ? 'bg-accent-lime/20' : 'bg-zinc-800',
              )}
            >
              <Icon
                name="cloud_upload"
                size={40}
                className={isDragOver ? 'text-accent-lime' : 'text-zinc-500'}
              />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-text-primary">
                {isDragOver ? 'Drop your file here' : 'Drag & drop your video'}
              </p>
              <p className="mt-1 text-sm text-text-muted">
                or click to browse — MP4, MOV, WebM up to 20GB
              </p>
            </div>
            <button
              type="button"
              className="mt-2 rounded-lg border border-zinc-700 bg-zinc-800 px-6 py-2.5 text-sm font-semibold text-text-primary transition-all hover:border-zinc-500 hover:bg-zinc-700 active:scale-95"
            >
              Browse Files
            </button>
          </div>
        )}
      </div>

      {/* Right Column: Controls */}
      <div className="flex min-h-0 flex-col gap-6 lg:col-span-5">
        {/* Publish Destinations */}
        <section className="glass shrink-0 rounded-2xl p-6" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Publish Destinations
          </h3>
          <div className="grid grid-cols-4 gap-3">
            {PLATFORM_CONFIG.map((p) => {
              const isActive = platforms.includes(p.id);
              return (
                <button
                  key={p.id}
                  type="button"
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-xl border p-4 transition-all active:scale-95',
                    isActive
                      ? 'border-accent-lime bg-accent-lime/5 text-accent-lime'
                      : 'border-zinc-800 bg-zinc-900/40 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200',
                  )}
                  onClick={() => togglePlatform(p.id)}
                  aria-pressed={isActive}
                >
                  <Icon name={p.icon} size={28} />
                  <span className="text-xs font-bold">{p.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* AI Performance Score */}
        {aiScoreVisible ? (
          <section
            className="animate-fade-in-up glass shrink-0 rounded-2xl p-6"
            style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Icon
                name="auto_awesome"
                size={18}
                className={cn('text-accent-lime', aiScoreLoading && 'animate-pulse')}
              />
              <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                AI Performance Prediction
              </h3>
              {aiScoreLoading ? (
                <span className="ml-auto text-[10px] font-medium text-accent-lime">
                  Analyzing…
                </span>
              ) : null}
            </div>

            {aiScoreLoading ? (
              <div className="space-y-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div
                        className="h-3 animate-pulse rounded bg-zinc-800"
                        style={{ width: `${100 - i * 10}px`, animationDelay: `${i * 200}ms` }}
                      />
                      <div
                        className="h-3 w-8 animate-pulse rounded bg-zinc-800"
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className="h-full animate-pulse rounded-full bg-zinc-700"
                        style={{
                          width: `${30 + i * 15}%`,
                          animationDelay: `${i * 200}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
            <div className="space-y-4">
              {AI_SCORE_FACTORS.map((factor, i) => {
                const visible = i < aiScoreFactorIndex;
                return (
                  <div
                    key={factor.label}
                    className={cn(
                      'transition-all duration-500',
                      visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
                    )}
                  >
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon
                          name={factor.icon}
                          size={16}
                          className={
                            factor.score >= 80
                              ? 'text-accent-lime'
                              : factor.score >= 70
                                ? 'text-status-warning'
                                : 'text-status-error'
                          }
                        />
                        <span className="text-xs font-bold text-text-primary">{factor.label}</span>
                      </div>
                      <span
                        className={cn(
                          'text-xs font-black',
                          factor.score >= 80
                            ? 'text-accent-lime'
                            : factor.score >= 70
                              ? 'text-status-warning'
                              : 'text-status-error',
                        )}
                      >
                        {factor.score}%
                      </span>
                    </div>
                    <div className="mb-1 h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-1000 ease-out',
                          factor.score >= 80
                            ? 'bg-accent-lime'
                            : factor.score >= 70
                              ? 'bg-status-warning'
                              : 'bg-status-error',
                        )}
                        style={{ width: visible ? `${factor.score}%` : '0%' }}
                      />
                    </div>
                    <p className="text-[10px] text-zinc-500">{factor.verdict}</p>
                  </div>
                );
              })}
            </div>
            )}
          </section>
        ) : null}

        {/* Post Content */}
        <section
          className="glass flex min-h-0 flex-1 flex-col rounded-2xl p-6"
          style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.05)' }}
        >
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Post Content
          </h3>
          <div className="no-scrollbar flex-1 space-y-6 overflow-y-auto pr-1">
            {/* Caption */}
            <div className="space-y-2">
              <label htmlFor="caption" className="text-xs font-bold text-zinc-400">
                CAPTION
              </label>
              <textarea
                id="caption"
                className="no-scrollbar min-h-[120px] w-full rounded-t-xl border-b border-zinc-800 bg-zinc-900/50 p-4 text-text-primary transition-colors focus:border-accent-lime focus:ring-0 focus:outline-none lg:min-h-[180px]"
                placeholder="Tell your story..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={MAX_CAPTION_LENGTH}
              />
              <div className="flex justify-between font-mono text-[10px] text-zinc-600">
                <span className={aiGenerating ? 'text-accent-lime' : ''}>
                  {aiGenerating ? (
                    <span className="flex items-center gap-1.5">
                      <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent-lime" />
                      AI GENERATING…
                    </span>
                  ) : (
                    'AI ASSISTANT ENABLED'
                  )}
                </span>
                <span>
                  {caption.length} / {MAX_CAPTION_LENGTH}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-zinc-400">TAGS</span>
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="animate-scale-in text-accent-lime cursor-pointer rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium transition-colors hover:bg-zinc-700"
                    onClick={() => removeTag(tag)}
                    aria-label={`Remove ${tag}`}
                  >
                    {tag}
                  </button>
                ))}
                {showTagInput ? (
                  <input
                    className="w-24 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-text-primary outline-none focus:border-accent-lime"
                    placeholder="#tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addTag();
                      }
                      if (e.key === 'Escape') {
                        setShowTagInput(false);
                        setNewTag('');
                      }
                    }}
                    onBlur={() => {
                      if (newTag) addTag();
                      else setShowTagInput(false);
                    }}
                    autoFocus
                  />
                ) : (
                  <button
                    type="button"
                    className="flex items-center gap-1 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs text-zinc-500 hover:border-zinc-600"
                    onClick={() => setShowTagInput(true)}
                  >
                    <Icon name="add" size={14} />
                    Add Tag
                  </button>
                )}
              </div>
            </div>

            {/* Publish Timing */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-zinc-400">PUBLISH NOW</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={publishNow}
                  onClick={() => setPublishNow((prev) => !prev)}
                  className={cn(
                    'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors',
                    publishNow ? 'bg-accent-lime' : 'bg-zinc-700',
                  )}
                >
                  <span
                    className={cn(
                      'inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform',
                      publishNow ? 'translate-x-6' : 'translate-x-1',
                    )}
                  />
                </button>
              </div>

              {!publishNow ? (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-zinc-400">SCHEDULE DATE</span>
                  <div className="flex gap-4">
                    <div className="flex flex-1 items-center justify-between rounded-t-lg border-b border-zinc-800 bg-zinc-900/50 p-3">
                      <input
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="w-full border-none bg-transparent text-sm text-text-primary outline-none"
                        aria-label="Schedule date"
                      />
                    </div>
                    <div className="flex flex-1 items-center justify-between rounded-t-lg border-b border-zinc-800 bg-zinc-900/50 p-3">
                      <input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="w-full border-none bg-transparent text-sm text-text-primary outline-none"
                        aria-label="Schedule time"
                      />
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex shrink-0 gap-4 pb-4 md:pb-0">
          <button
            type="button"
            className="border-accent-lime text-accent-lime hover:bg-accent-lime/5 flex-1 rounded-xl border px-6 py-4 text-sm font-bold uppercase tracking-wider transition-all active:scale-95"
          >
            Save Draft
          </button>
          <button
            type="button"
            className="bg-accent-lime text-bg-primary flex flex-[2] items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-black uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
            style={{ boxShadow: '0 0 15px rgba(195, 244, 0, 0)' }}
            onMouseDown={(e) => {
              (e.currentTarget.style.boxShadow = '0 0 15px rgba(195, 244, 0, 0.3)');
            }}
            onMouseUp={(e) => {
              (e.currentTarget.style.boxShadow = '0 0 15px rgba(195, 244, 0, 0)');
            }}
            onClick={() => startOverlay(publishNow ? 'publish' : 'schedule')}
          >
            <Icon name={publishNow ? 'send' : 'schedule_send'} filled size={18} />
            {publishNow ? 'Publish Now' : 'Schedule Post'}
          </button>
        </div>
      </div>

      {/* Publish / Schedule Overlay */}
      {overlayMode ? (
        <div
          className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          role="dialog"
          aria-label={overlayMode === 'publish' ? 'Publishing in progress' : 'Scheduling in progress'}
        >
          <div className="animate-scale-in w-full max-w-md space-y-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center">
            {/* Icon */}
            <div
              className={cn(
                'mx-auto flex h-20 w-20 items-center justify-center rounded-2xl',
                overlayDone ? 'bg-accent-lime/20' : 'bg-zinc-800',
              )}
            >
              <Icon
                name={overlayDone ? 'check_circle' : overlayMode === 'publish' ? 'cloud_upload' : 'schedule_send'}
                size={40}
                filled={overlayDone}
                className={cn(
                  overlayDone ? 'text-accent-lime' : 'text-zinc-400',
                  !overlayDone && 'animate-pulse',
                )}
              />
            </div>

            {/* Title */}
            <div>
              <h2 className="text-2xl font-bold text-white">
                {overlayDone
                  ? overlayMode === 'publish'
                    ? 'Published!'
                    : 'Scheduled!'
                  : overlayMode === 'publish'
                    ? 'Publishing your content…'
                    : 'Scheduling your post…'}
              </h2>
              {overlayDone ? (
                <p className="mt-2 text-sm text-zinc-400">
                  {overlayMode === 'publish'
                    ? 'Your video is now live on all selected platforms.'
                    : `Your post will go live on ${scheduleDate} at ${scheduleTime}.`}
                </p>
              ) : null}
            </div>

            {/* Steps */}
            {!overlayDone ? (
              <div className="space-y-3 text-left">
                {(overlayMode === 'publish' ? PUBLISH_STEPS : SCHEDULE_STEPS).map((step, i) => (
                  <div key={step} className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-500',
                        i < overlayStep
                          ? 'bg-accent-lime'
                          : i === overlayStep
                            ? 'border-2 border-accent-lime'
                            : 'border border-zinc-700',
                      )}
                    >
                      {i < overlayStep ? (
                        <Icon name="check" size={14} className="text-bg-primary" />
                      ) : null}
                    </div>
                    <span
                      className={cn(
                        'text-sm transition-colors duration-300',
                        i < overlayStep
                          ? 'font-medium text-accent-lime'
                          : i === overlayStep
                            ? 'font-medium text-white'
                            : 'text-zinc-600',
                      )}
                    >
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Platform badges */}
            {!overlayDone ? (
              <div className="flex items-center justify-center gap-3">
                {platforms.map((pId) => {
                  const pc = PLATFORM_CONFIG.find((p) => p.id === pId);
                  if (!pc) return null;
                  return (
                    <div
                      key={pId}
                      className="flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5"
                    >
                      <Icon name={pc.icon} size={16} className="text-accent-lime" />
                      <span className="text-xs font-medium text-zinc-300">{pc.label}</span>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {/* Done button */}
            {overlayDone ? (
              <button
                type="button"
                className="bg-accent-lime text-bg-primary w-full rounded-xl px-6 py-4 text-sm font-black uppercase tracking-wider transition-all hover:opacity-90 active:scale-95"
                onClick={() => setOverlayMode(null)}
              >
                Done
              </button>
            ) : (
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                <div
                  className="h-full rounded-full bg-accent-lime transition-all duration-1000 ease-out"
                  style={{
                    width: `${(overlayStep / (overlayMode === 'publish' ? PUBLISH_STEPS : SCHEDULE_STEPS).length) * 100}%`,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PostEditorPage;
