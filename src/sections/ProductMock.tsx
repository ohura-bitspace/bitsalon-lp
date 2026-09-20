import { useState } from 'react';
import './ProductMock.css';

/*
 * salon-reserve-mobile の管理画面と docs/guide の画面キャプチャをもとにしたモック。
 * 予約表とカルテを混在させず、実アプリと同じ別画面として切り替えて見せる。
 */

type Preview = 'calendar' | 'karte';
type Status = 'visited' | 'confirmed' | 'blocked';

type Slot = {
  /** 0時からの分。09:00 なら 540 */
  start: number;
  end: number;
  menus: string[];
  customer?: string;
  staff?: string;
  status: Status;
};

/** カレンダーの表示範囲。09:00〜18:00 */
const RANGE_START = 9 * 60;
const RANGE_HOURS = 9;

/*
 * 日付は表示時点を基準に組み立てる。固定値だと時間が経つほど「過去の予約表」になるため。
 */
const weekdayLabels = ['日', '月', '火', '水', '木', '金', '土'];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(base: Date, days: number) {
  const date = new Date(base);
  date.setDate(date.getDate() + days);
  return date;
}

/** 来店履歴で使う YYYY-MM-DD 形式 */
function daysAgo(days: number) {
  const date = addDays(today, -days);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

/** 「2026年9月19日 – 25日」。月・年をまたぐときだけ後半にも月・年を出す */
function weekRangeLabel(start: Date, end: Date) {
  const head = `${start.getFullYear()}年${start.getMonth() + 1}月${start.getDate()}日`;

  if (start.getFullYear() !== end.getFullYear()) {
    return `${head} – ${end.getFullYear()}年${end.getMonth() + 1}月${end.getDate()}日`;
  }
  if (start.getMonth() !== end.getMonth()) {
    return `${head} – ${end.getMonth() + 1}月${end.getDate()}日`;
  }
  return `${head} – ${end.getDate()}日`;
}

const today = startOfDay(new Date());

/** 表示週は直近の土曜はじまり。列の曜日色と schedule の並びを固定したまま使うため */
const weekStart = addDays(today, -((today.getDay() + 1) % 7));
const weekRange = weekRangeLabel(weekStart, addDays(weekStart, 6));
const todayIndex = (today.getDay() + 1) % 7;

const dayTones = ['saturday', 'sunday', 'weekday', 'weekday', 'weekday', 'weekday', 'weekday'];

const days = dayTones.map((tone, index) => {
  const date = addDays(weekStart, index);
  return { label: `${date.getMonth() + 1}/${date.getDate()}(${weekdayLabels[date.getDay()]})`, tone };
});

/* docs/guide の撮影用データと同じ顧客・メニューを使用 */
const schedule: Slot[][] = [
  [],
  [
    { start: 600, end: 660, menus: ['マッサージ'], customer: '田中 美咲', staff: 'HARU', status: 'confirmed' },
    { start: 840, end: 870, menus: ['ヘッドスパ'], customer: '鈴木 健太', staff: 'HARU', status: 'confirmed' },
  ],
  [],
  [
    { start: 630, end: 660, menus: ['ヘッドスパ'], customer: '田中 美咲', staff: 'HARU', status: 'confirmed' },
    { start: 780, end: 840, menus: ['マッサージ'], customer: '鈴木 健太', staff: 'HARU', status: 'confirmed' },
    {
      start: 840,
      end: 930,
      menus: ['マッサージ', 'ヘッドスパ'],
      customer: '田中 美咲',
      staff: 'HARU',
      status: 'confirmed',
    },
  ],
  [
    { start: 900, end: 960, menus: ['マッサージ'], customer: '高橋 由美', staff: 'HARU', status: 'confirmed' },
  ],
  [
    { start: 660, end: 720, menus: ['マッサージ'], customer: '鈴木 健太', staff: 'HARU', status: 'confirmed' },
  ],
  [
    { start: 810, end: 870, menus: ['マッサージ'], customer: '田中 美咲', staff: 'HARU', status: 'confirmed' },
  ],
];

const customers = [
  { initial: '田', name: '田中 美咲', lineName: 'Misaki.T', lastVisit: daysAgo(3), selected: true },
  { initial: '鈴', name: '鈴木 健太', lineName: 'Kenta.S', lastVisit: daysAgo(10) },
  { initial: '高', name: '高橋 由美', lineName: 'Yumi.T', lastVisit: daysAgo(15) },
];

/* 来店周期「0.5ヶ月」の表示と合うよう14日間隔を保つ */
const visits = [
  {
    date: daysAgo(3),
    menus: 'マッサージ＋ヘッドスパ',
    amount: '¥21,800',
    memo: '肩こりが気になるとのこと。首・肩を中心に施術。',
  },
  {
    date: daysAgo(17),
    menus: 'マッサージ＋ヘッドスパ',
    amount: '¥21,800',
    memo: '力加減を確認しながら、肩まわりを長めに。',
  },
  {
    date: daysAgo(31),
    menus: 'マッサージ＋ヘッドスパ',
    amount: '¥21,800',
    memo: '首まわりに張りあり。施術後は軽くなったとのこと。',
  },
];

function hhmm(minutes: number) {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0');
  const m = String(minutes % 60).padStart(2, '0');
  return `${h}:${m}`;
}

const icons = {
  calendar: (
    <>
      <rect x="2.2" y="3.2" width="11.6" height="10.6" rx="2" />
      <path d="M2.2 6.8h11.6M5.6 1.6v3M10.4 1.6v3" />
    </>
  ),
  person: (
    <>
      <circle cx="8" cy="5.2" r="2.6" />
      <path d="M2.9 14c0-2.9 2.3-4.7 5.1-4.7s5.1 1.8 5.1 4.7" />
    </>
  ),
  chat: <path d="M13.5 3.2h-11v7.4h3.1v2.6l3.1-2.6h4.8z" />,
  chart: <path d="M3.2 13.2V8M8 13.2V3.4M12.8 13.2v-3.4" />,
  gear: (
    <>
      <circle cx="8" cy="8" r="2.4" />
      <path d="M8 1.6v1.7M8 12.7v1.7M1.6 8h1.7M12.7 8h1.7M3.5 3.5l1.2 1.2M11.3 11.3l1.2 1.2M12.5 3.5l-1.2 1.2M4.7 11.3l-1.2 1.2" />
    </>
  ),
  search: (
    <>
      <circle cx="7" cy="7" r="4" />
      <path d="m10 10 3.2 3.2" />
    </>
  ),
};

function Icon({ name }: { name: keyof typeof icons }) {
  return (
    <svg className="mock__icon" viewBox="0 0 16 16" focusable="false">
      {icons[name]}
    </svg>
  );
}

const navItems: { id: Preview | 'message' | 'report' | 'settings'; label: string; icon: keyof typeof icons }[] = [
  { id: 'calendar', label: '予約表', icon: 'calendar' },
  { id: 'karte', label: 'カルテ', icon: 'person' },
  { id: 'message', label: 'メッセージ', icon: 'chat' },
  { id: 'report', label: 'レポート', icon: 'chart' },
  { id: 'settings', label: '設定', icon: 'gear' },
];

function AdminSidebar({ active }: { active: Preview }) {
  return (
    <aside className="mock__sidebar">
      <p className="mock__brand">bit Salon</p>
      <div className="mock__profile">
        <span className="mock__profile-avatar">H</span>
        <span>HARU</span>
      </div>
      <ul className="mock__nav">
        {navItems.map((item) => (
          <li
            className={`mock__nav-item${item.id === active ? ' mock__nav-item--active' : ''}`}
            key={item.id}
          >
            <Icon name={item.icon} />
            {item.label}
          </li>
        ))}
      </ul>
      <p className="mock__logout">ログアウト</p>
    </aside>
  );
}

function CalendarPreview() {
  return (
    <div className="mock__main">
      <div className="mock__viewbar">
        <p className="mock__views">
          <span className="mock__view">日</span>
          <span className="mock__view mock__view--active">週</span>
          <span className="mock__view">月</span>
        </p>
      </div>
      <div className="mock__datebar">
        <span className="mock__chevron">‹</span>
        <p>{weekRange}</p>
        <span className="mock__chevron">›</span>
      </div>

      <div className="mock__calendar">
        <div className="mock__axis">
          <div className="mock__axis-head" />
          <div className="mock__axis-body">
            {Array.from({ length: RANGE_HOURS + 1 }, (_, i) => (
              <span
                className="mock__axis-label"
                key={i}
                style={{ top: `calc(var(--mock-hour) * ${i})` }}
              >
                {RANGE_START / 60 + i}時
              </span>
            ))}
          </div>
        </div>

        {days.map((day, index) => (
          <div
            className={`mock__col mock__col--${day.tone}${index === todayIndex ? ' mock__col--today' : ''}`}
            key={day.label}
          >
            <div className="mock__col-head">{day.label}</div>
            <div className="mock__col-body">
              {schedule[index].map((slot) => {
                const isCompact = slot.end - slot.start <= 30;
                return (
                  <div
                    className={[
                      'mock__event',
                      `mock__event--${slot.status}`,
                      isCompact ? 'mock__event--compact' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    key={`${day.label}-${slot.start}`}
                    style={{
                      top: `calc(var(--mock-hour) * ${(slot.start - RANGE_START) / 60})`,
                      height: `calc(var(--mock-hour) * ${(slot.end - slot.start) / 60})`,
                    }}
                  >
                    {slot.status === 'blocked' ? (
                      <span className="mock__event-blocked">⊘ {slot.menus[0]}</span>
                    ) : (
                      <>
                        <span className="mock__event-customer">
                          {isCompact ? `${hhmm(slot.start)} - ${hhmm(slot.end)} ` : ''}
                          {slot.customer} 様
                        </span>
                        {!isCompact && (
                          <span className="mock__event-time">
                            {hhmm(slot.start)} - {hhmm(slot.end)}
                          </span>
                        )}
                        <span className="mock__event-staff">{slot.staff}</span>
                        <span className="mock__event-menus">
                          {slot.menus.map((menu) => (
                            <span className="mock__event-menu" key={menu}>
                              {menu}
                            </span>
                          ))}
                        </span>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KartePreview() {
  return (
    <>
      <aside className="mock__customer-list">
        <div className="mock__customer-tools">
          <div className="mock__search">
            <Icon name="search" />
            名前・カナ・電話で検索
          </div>
          <span className="mock__customer-add">＋ 新規</span>
          <div className="mock__filters">
            <span className="mock__filter mock__filter--active">全員</span>
            <span className="mock__filter">男性</span>
            <span className="mock__filter">女性</span>
          </div>
        </div>
        <ul>
          {customers.map((customer) => (
            <li
              className={`mock__customer-row${customer.selected ? ' mock__customer-row--selected' : ''}`}
              key={customer.name}
            >
              <span className="mock__customer-avatar">{customer.initial}</span>
              <div>
                <p className="mock__customer-row-name">{customer.name}</p>
                <p>LINE名: {customer.lineName}</p>
                <p>最終来店: {customer.lastVisit}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <div className="mock__karte-main">
        <div className="mock__karte-toolbar">
          <span className="mock__karte-back">‹</span>
          <span className="mock__ticket">▦ 回数券</span>
          <span className="mock__karte-more">•••</span>
        </div>
        <div className="mock__karte-heading">
          <p className="mock__customer-name">田中 美咲</p>
          <p className="mock__customer-kana">タナカ ミサキ</p>
        </div>

        <dl className="mock__stats">
          <div>
            <dt>来店回数</dt>
            <dd>6回</dd>
          </div>
          <div>
            <dt>平均単価 📈</dt>
            <dd>18,167円</dd>
            <span>グラフ表示</span>
          </div>
          <div>
            <dt>来店周期</dt>
            <dd>0.5ヶ月</dd>
          </div>
        </dl>

        <div className="mock__tabs">
          <span className="mock__tab mock__tab--active">来店履歴</span>
          <span className="mock__tab">メモ</span>
          <span className="mock__tab">詳細</span>
        </div>

        <ul className="mock__visits">
          {visits.map((visit) => (
            <li className="mock__visit" key={visit.date}>
              <div className="mock__visit-head">
                <time>{visit.date}</time>
                <strong>{visit.amount}</strong>
              </div>
              <p className="mock__visit-menu">{visit.menus}</p>
              <p className="mock__visit-staff">
                担当: HARU <span className="mock__payment-chip">クレカ</span>
              </p>
              <div className="mock__visit-memo">
                <p>{visit.memo}</p>
                <span>メモを編集</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default function ProductMock() {
  const [preview, setPreview] = useState<Preview>('calendar');

  return (
    <section className="mock">
      <figure className="container mock__figure">
        <div className="mock__preview-switch" role="group" aria-label="画面イメージの切り替え">
          <button
            className={preview === 'calendar' ? 'mock__preview-button mock__preview-button--active' : 'mock__preview-button'}
            type="button"
            aria-pressed={preview === 'calendar'}
            onClick={() => setPreview('calendar')}
          >
            予約表
          </button>
          <button
            className={preview === 'karte' ? 'mock__preview-button mock__preview-button--active' : 'mock__preview-button'}
            type="button"
            aria-pressed={preview === 'karte'}
            onClick={() => setPreview('karte')}
          >
            カルテ
          </button>
        </div>

        {/* 中身は画面イメージなので、読み上げは figcaption に任せる */}
        <div className={`mock__frame mock__frame--${preview}`} aria-hidden="true">
          <AdminSidebar active={preview} />
          {preview === 'calendar' ? <CalendarPreview /> : <KartePreview />}
          <ul className="mock__mobile-nav">
            {navItems.map((item) => (
              <li
                className={`mock__mobile-nav-item${item.id === preview ? ' mock__mobile-nav-item--active' : ''}`}
                key={item.id}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>

        <figcaption className="mock__caption">
          実際の管理画面をもとにした予約表・カルテ画面のイメージです。
        </figcaption>
      </figure>
    </section>
  );
}
