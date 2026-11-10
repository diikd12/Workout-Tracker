export default function SaranLatihan({ jadwal, selectedHari, onSelectHari }) {
  return (
    <div className="schedule-wrapper">
      <p className="schedule-heading">Jadwal Mingguan</p>
      <div className="schedule-grid">
        {jadwal.map((item) => {
          const isSelected = selectedHari === item.hari;
          const isRest = item.jenis === 'Rest Day';

          let cls = 'schedule-btn';
          if (isSelected) cls += ' active';
          if (isRest)     cls += ' rest';

          return (
            <button
              key={item.hari}
              className={cls}
              onClick={() => !isRest && onSelectHari(item.hari)}
              aria-pressed={isSelected}
              aria-label={`${item.hari} — ${item.jenis}`}
              disabled={isRest}
            >
              <span className="schedule-day">{item.hari.slice(0, 3)}</span>
              <span className="schedule-type">{item.jenis === 'Rest Day' ? '—' : item.jenis}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
