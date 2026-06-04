import { ChevronLeft, ChevronRight, Image as ImageIcon, Smartphone } from 'lucide-react';
import { useState } from 'react';
import capture1 from '../../../asset/캡처.PNG';
import capture2 from '../../../asset/캡처2.PNG';
import capture3 from '../../../asset/캡처3.PNG';
import capture4 from '../../../asset/캡처4.PNG';
import capture5 from '../../../asset/캡처5.PNG';

const mobileScreens = [
  {
    title: '캡처 1',
    description: '사용자 유형 선택, 경로 검색, 지도 기반 경로 검색 화면',
    image: capture1,
  },
  {
    title: '캡처 2',
    description: '경로 비교, 실시간 안내, 위험구간 상세 화면',
    image: capture2,
  },
  {
    title: '캡처 3',
    description: '위험구간 제보, 제보 정보 입력, 내 정보 화면',
    image: capture3,
  },
  {
    title: '캡처 4',
    description: '고령자 모드, 휠체어 모드, 음성 안내 화면',
    image: capture4,
  },
  {
    title: '캡처 5',
    description: '모바일 위젯, 제보 카드, 부산 보행 안전 대시보드 화면',
    image: capture5,
  },
];

export function MobileScreensPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentScreen = mobileScreens[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === mobileScreens.length - 1;

  const goPrevious = () => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  };

  const goNext = () => {
    setCurrentIndex((index) => Math.min(index + 1, mobileScreens.length - 1));
  };

  return (
    <div className="flex min-h-[900px] flex-col gap-4 overflow-hidden">
      <header className="flex shrink-0 flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-[11px] font-black leading-4 text-civic-700">모바일 시연 · On-gil App</p>
          <h1 className="text-[29px] font-black leading-9 text-navy-950">모바일 화면 캡처 보기</h1>
          <p className="text-[13px] font-semibold leading-5 text-slate-500">
            발표용 모바일 화면을 캡처 1부터 5까지 순서대로 확인합니다.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-[18px] border border-blue-100 bg-white px-4 py-3 text-xs font-black text-slate-500 shadow-sm">
          <Smartphone className="h-4 w-4 text-action-500" aria-hidden="true" />
          <span className="text-navy-900">{currentIndex + 1}</span>
          <span>/ {mobileScreens.length}</span>
        </div>
      </header>

      <section className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[270px_minmax(0,1fr)]">
        <aside className="app-card flex min-h-0 flex-col p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue-50 text-action-600">
              <ImageIcon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-black text-navy-950">캡처 순서</h2>
              <p className="text-xs font-bold text-slate-400">1번부터 차례대로 보기</p>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            {mobileScreens.map((screen, index) => {
              const isActive = index === currentIndex;

              return (
                <button
                  key={screen.title}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={[
                    'flex items-center gap-3 rounded-[16px] border px-3 py-3 text-left transition',
                    isActive
                      ? 'border-action-200 bg-blue-50 text-action-600 shadow-sm'
                      : 'border-blue-50 bg-white text-slate-500 hover:border-blue-100 hover:bg-slate-50',
                  ].join(' ')}
                  aria-current={isActive ? 'step' : undefined}
                >
                  <span
                    className={[
                      'grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-black',
                      isActive ? 'bg-action-500 text-white' : 'bg-slate-100 text-slate-500',
                    ].join(' ')}
                  >
                    {index + 1}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[13px] font-black text-navy-950">{screen.title}</span>
                    <span className="mt-0.5 line-clamp-2 block text-[11px] font-semibold leading-4 text-slate-500">
                      {screen.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto grid grid-cols-2 gap-3 pt-5">
            <button
              type="button"
              onClick={goPrevious}
              disabled={isFirst}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white text-xs font-black text-navy-900 shadow-sm transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              이전
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={isLast}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-action-500 text-xs font-black text-white shadow-[0_12px_22px_rgba(36,119,255,0.22)] transition hover:bg-action-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
            >
              다음
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </aside>

        <article className="app-card flex min-h-0 flex-col overflow-hidden p-4">
          <div className="flex shrink-0 items-center justify-between gap-3 px-1 pb-4">
            <div className="min-w-0">
              <h2 className="text-xl font-black text-navy-950">{currentScreen.title}</h2>
              <p className="mt-1 text-xs font-bold text-slate-500">{currentScreen.description}</p>
            </div>
            <span className="shrink-0 rounded-full bg-civic-50 px-3 py-1 text-xs font-black text-civic-700">
              모바일 화면
            </span>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden rounded-[22px] border border-blue-100 bg-[#f6faff] p-4">
            <div className="flex h-full min-h-[620px] items-center justify-center overflow-hidden rounded-[20px] bg-white shadow-[inset_0_0_0_1px_rgba(219,234,254,0.9)]">
              <img
                src={currentScreen.image}
                alt={`${currentScreen.title} 모바일 화면 캡처`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
