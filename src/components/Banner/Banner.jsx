const Banner = ({
  totalFriends = 0,
  onTrack = 0,
  needAttention = 0,
  interactionsThisMonth = 0,
  onAddFriend,
}) => {
  const stats = [
    { label: 'Total Friends', value: totalFriends },
    { label: 'On Track', value: onTrack },
    { label: 'Need Attention', value: needAttention },
    { label: 'Interactions This Month', value: interactionsThisMonth },
  ];

  return (
    <section className="w-full pt-10 sm:pt-14">
      <div className="text-center">
        <h1 className="text-2xl sm:text-4xl md:text-[42px] font-bold tracking-[-0.02em] text-[#1B2631] leading-tight">
          Friends to keep close in your life
        </h1>
        <p className="mt-3.5 text-xs sm:text-[15px] text-[#64748B] max-w-[460px] mx-auto leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={onAddFriend}
            className="inline-flex items-center gap-2 bg-[#234636] hover:bg-[#1b362a] text-white text-xs sm:text-sm font-medium px-4 sm:px-5 py-2.5 rounded-[6px] transition-colors cursor-pointer"
          >
            <span className="text-base leading-none">+</span>
            <span>Add a Friend</span>
          </button>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.label}
            className="bg-white rounded-xl py-7 px-5 text-center shadow-[0_2px_12px_rgba(15,23,42,0.035)] border border-slate-100"
          >
            <div className="text-2xl sm:text-[28px] font-bold text-[#234636] leading-none">
              {item.value}
            </div>
            <div className="mt-2.5 text-xs sm:text-sm text-[#64748B]">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border-b border-slate-200/80" />
    </section>
  );
};

export default Banner;