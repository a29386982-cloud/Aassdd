import React, { useState } from 'react';
import {
  Sparkles,
  Keyboard,
  ArrowRightLeft,
  Copy,
  Check,
  LayoutDashboard,
  CheckSquare,
  Palette,
  FileCode,
  Compass,
  Zap,
  Globe,
  Sliders,
  RefreshCw,
  Search,
  MessageSquare
} from 'lucide-react';

// Russian <-> English Keyboard layout maps
const EN_RU_MAP: Record<string, string> = {
  'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г', 'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ъ',
  'a': 'ф', 's': 'ы', 'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д', ';': 'ж', '\'': 'э',
  'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и', 'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю', '/': '.',
  'Q': 'Й', 'W': 'Ц', 'E': 'У', 'R': 'К', 'T': 'Е', 'Y': 'Н', 'U': 'Г', 'I': 'Ш', 'O': 'Щ', 'P': 'З', '{': 'Х', '}': 'Ъ',
  'A': 'Ф', 'S': 'Ы', 'D': 'В', 'F': 'А', 'G': 'П', 'H': 'Р', 'J': 'О', 'K': 'Л', 'L': 'Д', ':': 'Ж', '"': 'Э',
  'Z': 'Я', 'X': 'Ч', 'C': 'С', 'V': 'М', 'B': 'И', 'N': 'Т', 'M': 'Ь', '<': 'Б', '>': 'Ю', '?': ',',
  '@': '"', '#': '№', '$': ';', '^': ':', '&': '?'
};

const RU_EN_MAP: Record<string, string> = Object.entries(EN_RU_MAP).reduce((acc, [en, ru]) => {
  acc[ru] = en;
  return acc;
}, {} as Record<string, string>);

function convertLayout(text: string, toRussian = true): string {
  const map = toRussian ? EN_RU_MAP : RU_EN_MAP;
  return text.split('').map(char => map[char] || char).join('');
}

interface ProjectIdea {
  id: string;
  title: string;
  titleRu: string;
  category: string;
  description: string;
  descriptionRu: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  suggestedPrompt: string;
}

const PROJECT_IDEAS: ProjectIdea[] = [
  {
    id: 'dashboard',
    title: 'Executive Analytics Dashboard',
    titleRu: 'Аналитический Дашборд',
    category: 'SaaS / Data',
    description: 'Real-time charts, KPIs, revenue graphs, and conversion funnels.',
    descriptionRu: 'Интерактивные графики, KPI, выручка и статистика активности.',
    icon: LayoutDashboard,
    tags: ['React', 'Charts', 'Metrics', 'Tailwind'],
    suggestedPrompt: 'Сделай аналитический дашборд с графиками продаж, списком пользователей и фильтрами по датам.'
  },
  {
    id: 'kanban',
    title: 'Kanban & Task Management',
    titleRu: 'Канбан-доска и Таск-трекер',
    category: 'Productivity',
    description: 'Drag-and-drop boards, priority tags, subtasks, and progress stats.',
    descriptionRu: 'Колонки задач, карточки с приоритетами, фильтры и статистика выполнения.',
    icon: CheckSquare,
    tags: ['Drag & Drop', 'Productivity', 'Filters'],
    suggestedPrompt: 'Создай канбан-доску для управления проектом с колонками To Do, In Progress, Done и тегами приоритета.'
  },
  {
    id: 'palette',
    title: 'Color Palette & Design Studio',
    titleRu: 'Генератор цветовых палитр',
    category: 'Design Tools',
    description: 'Generate, lock, test contrast ratios, and export Tailwind/CSS palettes.',
    descriptionRu: 'Генерация палитр, проверка контраста WCAG, экспорт в CSS и Tailwind.',
    icon: Palette,
    tags: ['Design', 'Colors', 'Export', 'CSS'],
    suggestedPrompt: 'Сделай интерактивный генератор цветовых палитр с возможностью блокировки цветов и экспортом в Tailwind.'
  },
  {
    id: 'devkit',
    title: 'DevKit & String Transformer',
    titleRu: 'Инструменты разработчика DevKit',
    category: 'Utilities',
    description: 'JSON formatter, Base64/JWT inspector, regex tester, and hash tools.',
    descriptionRu: 'Форматирование JSON, декодер Base64, проверка Regex и генератор хэшей.',
    icon: FileCode,
    tags: ['Utility', 'JSON', 'Regex', 'Base64'],
    suggestedPrompt: 'Создай набор утилит для разработчика с форматированием JSON, декодированием Base64 и regex-тестером.'
  }
];

export default function App() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const [inputText, setInputText] = useState('ghbdtn! rfr ltkf?');
  const [copied, setCopied] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<ProjectIdea | null>(PROJECT_IDEAS[0]);
  const [promptCopied, setPromptCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  const convertedToRu = convertLayout(inputText, true);
  const convertedToEn = convertLayout(inputText, false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setPromptCopied(true);
    setTimeout(() => setPromptCopied(false), 2000);
  };

  const filteredIdeas = PROJECT_IDEAS.filter(idea => {
    const query = searchFilter.toLowerCase();
    return (
      idea.title.toLowerCase().includes(query) ||
      idea.titleRu.toLowerCase().includes(query) ||
      idea.tags.some(t => t.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold text-lg">
              ✨
            </div>
            <div>
              <h1 className="font-bold text-base tracking-tight text-white flex items-center gap-2">
                Creative Studio
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-medium">
                  Ready
                </span>
              </h1>
              <p className="text-xs text-slate-400">
                {lang === 'ru' ? 'Среда разработки приложений' : 'Web Application Workspace'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/60 text-xs">
              <button
                onClick={() => setLang('ru')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  lang === 'ru'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                RU (Русский)
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  lang === 'en'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                EN (English)
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 space-y-10">
        <section className="relative overflow-hidden rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-purple-950/30 p-8 shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              {lang === 'ru' ? 'Вы написали "ghbdtn" → "Привет!"' : 'Greeting received! ("ghbdtn" = "Привет!")'}
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              {lang === 'ru' ? (
                <>
                  Привет! Рад вас слышать. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                    Что мы сегодня создадим?
                  </span>
                </>
              ) : (
                <>
                  Hello & Welcome! <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
                    What would you like to build?
                  </span>
                </>
              )}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {lang === 'ru'
                ? 'Вы ввели "ghbdtn" в английской раскладке. Напишите любую задачу или идею: веб-сервис, дашборд, калькулятор, игру или инструмент — и я реализую его с чистым кодом и современным дизайном!'
                : 'You typed "ghbdtn" in standard English keyboard layout. Tell me what app you want: a dashboard, tracker, game, tool, or landing page, and I will craft it for you!'}
            </p>
          </div>
        </section>

        {/* Live Interactive Utility: Keyboard Layout Fixer */}
        <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <Keyboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-100 text-base flex items-center gap-2">
                  {lang === 'ru' ? 'Декодер раскладки клавиатуры' : 'Keyboard Layout Fixer'}
                  <span className="text-[11px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded border border-slate-700">
                    QWERTY ⇄ ЙЦУКЕН
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'ru'
                    ? 'Мгновенно исправляет случайно набранный текст при неверной раскладке'
                    : 'Instantly converts mistakenly typed text between English & Russian layouts'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setInputText('ghbdtn! rfr ltkf?')}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
              >
                "ghbdtn! rfr ltkf?"
              </button>
              <button
                onClick={() => setInputText('Ghbdtn vbh!')}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
              >
                "Ghbdtn vbh!"
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{lang === 'ru' ? 'Исходный текст:' : 'Raw Input:'}</span>
                <span className="text-[10px] text-slate-500">{inputText.length} символов</span>
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={lang === 'ru' ? 'Введите текст в любой раскладке...' : 'Type text in any layout...'}
                rows={3}
                className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl p-3 text-sm text-slate-100 placeholder:text-slate-600 outline-none transition-all resize-none"
              />
            </div>

            {/* Output */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>{lang === 'ru' ? 'Исправленный русский текст:' : 'Converted Russian:'}</span>
                <button
                  onClick={() => handleCopy(convertedToRu)}
                  className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">{lang === 'ru' ? 'Скопировано!' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{lang === 'ru' ? 'Скопировать' : 'Copy'}</span>
                    </>
                  )}
                </button>
              </div>
              <div className="w-full bg-slate-950/90 border border-indigo-900/40 rounded-xl p-3 text-sm text-indigo-200 font-mono min-h-[82px] flex items-center justify-between">
                <span className="break-all">{convertedToRu || <span className="text-slate-600 font-sans italic">{lang === 'ru' ? 'Результат появится здесь' : 'Result will appear here'}</span>}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Ideas & Starters Section */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-400" />
                {lang === 'ru' ? 'Примеры проектов для старта' : 'Project Templates & Starters'}
              </h3>
              <p className="text-xs text-slate-400">
                {lang === 'ru'
                  ? 'Выберите тип приложения, чтобы вдохновиться или сразу скопировать готовый запрос'
                  : 'Select an application archetype for inspiration or instant prompts'}
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder={lang === 'ru' ? 'Поиск идей...' : 'Search starters...'}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredIdeas.map((idea) => {
              const Icon = idea.icon;
              const isSelected = selectedIdea?.id === idea.id;
              return (
                <div
                  key={idea.id}
                  onClick={() => setSelectedIdea(idea)}
                  className={`group cursor-pointer rounded-xl p-5 border transition-all text-left flex flex-col justify-between ${
                    isSelected
                      ? 'bg-indigo-950/30 border-indigo-500/60 shadow-lg shadow-indigo-500/10'
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 group-hover:text-white'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                        {idea.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-100 text-sm group-hover:text-indigo-300 transition-colors">
                        {lang === 'ru' ? idea.titleRu : idea.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {lang === 'ru' ? idea.descriptionRu : idea.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-wrap gap-1.5">
                    {idea.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Idea Details & Quick Prompt */}
          {selectedIdea && (
            <div className="mt-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-indigo-950/40 border border-slate-800 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase text-indigo-400 tracking-wider">
                    {lang === 'ru' ? 'Готовый запрос для чата' : 'Suggested Request Prompt'}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-slate-400">
                    {lang === 'ru' ? selectedIdea.titleRu : selectedIdea.title}
                  </span>
                </div>
                <p className="text-sm text-slate-200 bg-slate-950/80 p-3 rounded-xl border border-slate-800 font-mono">
                  "{selectedIdea.suggestedPrompt}"
                </p>
                <p className="text-xs text-slate-500">
                  {lang === 'ru'
                    ? 'Скопируйте этот текст или напишите свои пожелания своими словами в сообщении ниже.'
                    : 'Copy this prompt or send your custom request in the chat.'}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => handleCopyPrompt(selectedIdea.suggestedPrompt)}
                  className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
                >
                  {promptCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>{lang === 'ru' ? 'Скопировано!' : 'Prompt Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{lang === 'ru' ? 'Скопировать запрос' : 'Copy Prompt'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Quick Instructions / Features banner */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-slate-200">
                {lang === 'ru' ? 'Быстрое создание' : 'Fast Iteration'}
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'ru'
                  ? 'Опишите нужный интерфейс или логику, и приложение обновится в реальном времени.'
                  : 'Describe your UI or workflow, and the app updates immediately.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-slate-200">
                {lang === 'ru' ? 'Полный стек React + Tailwind' : 'Full React & Tailwind'}
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'ru'
                  ? 'Поддерживаются компоненты, анимации, графики, работа с локальными данными и API.'
                  : 'Full support for interactive components, animations, charts, and API integrations.'}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-semibold text-slate-200">
                {lang === 'ru' ? 'Любой язык ввода' : 'Any Language'}
              </h5>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'ru'
                  ? 'Пишите по-русски или по-английски — я пойму любую формулировку.'
                  : 'Feel free to communicate in Russian or English anytime.'}
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <p>
          {lang === 'ru'
            ? 'Creative Studio Hub • Готов к работе. Напишите вашу задачу!'
            : 'Creative Studio Hub • Ready for your prompt. Tell me what to build!'}
        </p>
      </footer>
    </div>
  );
}
