const Loading = () => {
  return (
    <section
      id="wrapper"
      className="animate-pulse cursor-default flex flex-col items-center justify-around lg:w-3/4 w-full mx-auto text-center text-slate-400 dark:text-gray-400 h-full [&>*]:w-full"
    >
      <div id="title" className="flex flex-col items-center">
        <div className="bg-slate-400 dark:bg-purple-400 mb-4 h-4 w-2/3" />
        <div className="bg-slate-500 dark:bg-purple-500 h-5 w-2/4" />
        <span className="inline-block h-1 w-10 rounded bg-slate-600 dark:bg-purple-500 mt-8 mb-6"></span>
      </div>
      <div className="icon-basic flex justify-center bg-slate-400 dark:bg-purple-400 h-20 [&]:w-20" />
      <div id="footer" className="flex flex-col items-center">
        <span className="inline-block h-1 w-10 rounded bg-slate-600 dark:bg-purple-500 mt-8 mb-6"></span>
        <div className="bg-slate-500 dark:bg-purple-500 h-10 w-full" />
        <span className="inline-block h-1 w-10 rounded bg-slate-600 dark:bg-purple-500 mt-8 mb-6"></span>
        <div id="cta" className="flex justify-around">
          <div className="bg-slate-400 dark:bg-purple-400 mb-4 h-4 w-7" />
          <span className="inline-block h-1 w-10"></span>
          <div className="bg-slate-400 dark:bg-purple-400 mb-4 h-4 w-7" />
        </div>
      </div>
    </section>
  );
};

export default Loading;
