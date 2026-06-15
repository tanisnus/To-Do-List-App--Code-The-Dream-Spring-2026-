function AboutPage() {
    return (
        <div>
            {/* ── Section 1: Hero ── */}
            <section className="flex flex-col items-center px-8 py-16 bg-indigo-50 text-center">
                <span className="flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-1.5 text-sm font-medium text-indigo-900">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Our Story
                </span>

                <h1 className="mt-6 text-4xl font-bold text-gray-900">
                    Welcome to the Todo List App
                </h1>

                <p className="mt-4 max-w-2xl text-lg text-gray-500">
                    A minimal productivity tool designed to help you regain focus and manage
                    your daily flow with professional precision.
                </p>
            </section>

            {/* ── Section 2: Philosophy + Feature Cards ── */}
            <section className="px-8 py-16 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900">
                    The Philosophy of Clarity
                </h2>

                <p className="mt-4 text-gray-500 leading-relaxed">
                    TaskFlow was born from the need for a distraction-free environment. We believe
                    that productivity isn&apos;t about doing more, but about doing what matters. Our
                    interface follows a systematic 8px grid and purposeful motion to ensure your
                    focus remains on your tasks, not the tool.
                </p>

                {/* flex container → cards are flex items side by side */}
                <div className="mt-8 flex flex-col gap-6 sm:flex-row">
                    <div className="flex-1 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-[#4F46E5]">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        </div>
                        <h3 className="mt-4 font-bold text-gray-900">Efficiency First</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            Rapid task entry and keyboard shortcuts designed for power users who
                            value their time.
                        </p>
                    </div>

                    <div className="flex-1 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 text-[#4F46E5]">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        </div>
                        <h3 className="mt-4 font-bold text-gray-900">Focus Mode</h3>
                        <p className="mt-2 text-sm text-gray-500">
                            A visual hierarchy that highlights active tasks while gracefully fading
                            completed items into the background.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Section 3: Tech Stack ── */}
            <section className="px-8 py-16 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900">
                    Modern Engineering Stack
                </h2>

                <p className="mt-4 text-gray-500">
                    TaskFlow is built with industry standards to ensure performance, scalability,
                    and a seamless developer experience.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                    <div className="flex-1 flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-600">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">React</p>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Framework</p>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-500">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="5" cy="6" r="3" />
                                <circle cx="19" cy="6" r="3" />
                                <circle cx="12" cy="18" r="3" />
                                <path d="M7.5 8.5L10.5 15.5M16.5 8.5L13.5 15.5" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">React Router</p>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Navigation</p>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 text-yellow-600">
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-gray-900">Vite</p>
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">Build Tool</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutPage;
