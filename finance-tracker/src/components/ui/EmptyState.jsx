const EmptyState = ({ icon = '📭', title, description }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <span className="text-5xl mb-4">{icon}</span>
    <h3 className="text-lg font-semibold text-slate-300 mb-2">{title}</h3>
    <p className="text-slate-500 text-sm max-w-xs">{description}</p>
  </div>
);

export default EmptyState;
