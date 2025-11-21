'use client';

import React, { useRef, useState, useEffect } from 'react';
// Import Next.js Image component for optimized logo loading
import Image from 'next/image';
import {
  Search,
  Coins,
  ChevronDown,
  User,
  Bell,
  Star,
  Wallet,
  LayoutGrid,
  TrendingUp,
  ArrowRightLeft,
  Clock,
  Eye,
  ChartLine,
  Triangle,
  X,
  Droplet,
  ChartNoAxesColumn,
  ChevronLeft,
  ChevronRight as ChevronRightIcon
} from 'lucide-react';


/**
 * NOTE:
 * The logo image used below points to a local path you provided in the session:
 * /mnt/data/b7c81c7b-403a-4ec6-b020-77333a11d59c.png
 *
 * As requested by the developer message, that local path is used as the image URL.
 */
type Network = 'SOL' | 'BNB';
export const MainNavbar = React.memo(() => {
  // Adjusted navItems to match the visible links in the image
  const navItems = [
    { name: 'Discover' },
    { name: 'Pulse' },
    { name: 'Trackers' },
    { name: 'Perpetuals' },
    { name: 'Yield' },
    { name: 'Vision' },
    { name: 'Portfolio' },
    { name: 'Rewards' },
  ];

  // The 'Pulse' link is active in the image
  const activeItem = 'Pulse';
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Ref for the horizontal nav scroller
  const navScrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollNavBy = (amount: number) => {
    if (!navScrollerRef.current) return;
    navScrollerRef.current.scrollBy({
      left: amount,
      behavior: 'smooth'
    });
  };

   const [networkMenuOpen, setNetworkMenuOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>('SOL'); // default SOL selected
  const networkRef = useRef<HTMLDivElement | null>(null);

  // close network dropdown on outside click
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!networkRef.current) return;
      if (!networkRef.current.contains(e.target as Node)) {
        setNetworkMenuOpen(false);
      }
    };
    if (networkMenuOpen) document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [networkMenuOpen]);

  // close modals on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setNetworkMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);


  const [searchValue, setSearchValue] = useState("");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

   useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Click outside to close
  useEffect(() => {
    if (!isSearchOpen) return;
    const handler = (e: MouseEvent) => {
      if (!modalRef.current) return;
      if (!modalRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isSearchOpen]);

  const openSearch = () => {
    setIsSearchOpen(true);
    // focus next tick when modal opens
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const clearSearch = () => {
    setSearchValue('');
    // keep focus after clearing
    inputRef.current?.focus();
  };

  // sample chips and history (replace with real data)
  const chips = [
    'Pump',
    'Bonk',
    'Bags',
    'USD1',
    'OG Mode',
    'Graduated',
  ];

  const history = [
    'MERICA',
    'PEPPER',
    'BAOVERSE',
  ];

  return (
    <>
    <nav className="h-14 bg-black border-b border-zinc-800 flex items-center justify-between px-3 lg:px-6 shrink-0 z-40">
      <div className="flex items-center gap-6">

        {/* 🎯 LOGO & BRAND AREA 🎯 */}
        <div className="flex items-center shrink-0 cursor-pointer text-white">
          <Image
            // local file path from session (will be transformed by the environment)
            src="/Axiom.jpeg"
            alt="Axiom Logo"
            width={24}
            height={24}
            priority
            className="mr-1 rounded-sm object-cover"
          />
          <span className="text-xl font-extrabold tracking-tight mr-1">AXIOM</span>
          <span className="text-[10px] text-zinc-500 font-bold">PRO</span>
        </div>

        {/* ---------- HORIZONTAL / ROLLING NAV BAR ---------- */}
        <div className="relative flex items-center h-10">
          {/* Left scroll button */}
          <button
            onClick={() => scrollNavBy(-160)}
            aria-label="Scroll left"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-md mr-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Scroller: overflow-x auto, single-line nav */}
          <div
            ref={navScrollerRef}
            className="flex gap-1 items-center h-full overflow-x-auto no-scrollbar pr-2"
            style={{
              // ensure a single line and smooth scrolling
              whiteSpace: 'nowrap',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              maxWidth: '500px',
            }}
          >
            {/* Optional gradient fade on left (visual only) */}
            <div className="hidden sm:block absolute left-0 z-10 w-6 h-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />

            {/* Actual items */}
            {navItems.map((item) => {
              const isActive = item.name === activeItem;
              return (
                <button
                  key={item.name}
                  className={`inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                    ${isActive ? 'text-indigo-400 border-b-2 border-indigo-400 font-bold pb-1' : 'text-zinc-300 hover:text-zinc-300'}
                  `}
                >
                  {item.name}
                </button>
              );
            })}

            {/* Optional gradient fade on right (visual only) */}
            <div className="hidden sm:block absolute right-0 z-10 w-6 h-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />
          </div>

          {/* Right scroll button */}
          <button
            onClick={() => scrollNavBy(160)}
            aria-label="Scroll right"
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-md ml-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 transition-colors"
          >
            <ChevronRightIcon size={16} />
          </button>
        </div>

      </div>

      {/* --- Right Side Controls (Pixel-perfect replica) --- */}
      <div className="flex items-center gap-2">

        {/* 1. Search Bar (Input Field) */}
         <div
            className="flex items-center bg-[#0d0e10] border border-zinc-800 rounded-lg pl-3 pr-1.5 py-1.5 w-64 text-zinc-400 focus-within:border-zinc-500 transition-colors"
            onClick={() => openSearch()}
          >
            <Search size={16} className="mr-2" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by name, ticker, or CA..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onFocus={() => openSearch()}
              className="bg-transparent text-sm w-full focus:outline-none placeholder:text-zinc-600"
            />

            {/* show X only when input has value */}
            {searchValue.length > 0 ? (
              <button
                className="p-1 rounded-full text-zinc-500 hover:text-zinc-300 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  clearSearch();
                }}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            ) : null}
          </div>

        {/* NETWORK Dropdown (SOL button) */}
         {/* NETWORK Dropdown */}
<div className="relative" ref={networkRef}>
  <button
    onClick={() => setNetworkMenuOpen((s) => !s)}
    className="flex items-center bg-[#17171A] border border-zinc-800 text-zinc-200 text-sm font-bold px-3 py-1.5 rounded-lg hover:bg-[#202025] transition-colors h-9"
  >
    {/* Dynamic Logo Swap */}
    <div className="w-5 h-5 mr-2 relative flex items-center justify-center">
      {selectedNetwork === 'SOL' ? (
        <Image
          src="//logotyp.us/file/solana.svg"
          alt="Solana"
          width={28}
          height={28}
          className="object-contain"
        />
      ) : (
        <Image
          src="/bnb.jpeg"   // <-- Use your uploaded BNB asset
          alt="BNB"
          width={28}
          height={28}
          className="object-contain"
        />
      )}
    </div>

    <span className="text-sm font-semibold mr-2">{selectedNetwork}</span>
    <ChevronDown size={16} className="ml-1.5 text-zinc-400" />
  </button>

  {/* Dropdown menu */}
  {networkMenuOpen && (
    <div className="absolute right-0 mt-2 w-44 bg-[#0b0b0d] border border-zinc-800 rounded-lg shadow-lg z-50 overflow-hidden">

      {/* Solana */}
      <button
        onClick={() => {
          setSelectedNetwork('SOL');
          setNetworkMenuOpen(false);
        }}
        className={`w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-zinc-900/40 ${
          selectedNetwork === 'SOL' ? 'bg-zinc-900/60' : ''
        }`}
      >
        <Image
          src="//logotyp.us/file/solana.svg"
          alt="Solana"
          width={36}
          height={36}
          className="object-contain"
        />
        <div>
          <div className="text-sm font-semibold">Solana</div>
          <div className="text-xs text-zinc-400">SOL</div>
        </div>
      </button>

      {/* BNB */}
      <button
        onClick={() => {
          setSelectedNetwork('BNB');
          setNetworkMenuOpen(false);
        }}
        className={`w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-zinc-900/40 ${
          selectedNetwork === 'BNB' ? 'bg-zinc-900/60' : ''
        }`}
      >
        <Image
          src="/bnb.jpeg"   // <-- Replace with your BNB uploaded file
          alt="BNB"
          width={36}
          height={36}
          className="object-contain"
        />
        <div>
          <div className="text-sm font-semibold">BNB</div>
          <div className="text-xs text-zinc-400">BNB</div>
        </div>
      </button>

        </div>
    )}
    </div>

        {/* 3. Deposit Button (Blue/Indigo color) */}
        <button className="bg-indigo-600 hover:bg-indigo-500 text-black text-sm font-bold px-6 py-2 rounded-3xl transition-colors h-9">
          Deposit
        </button>

        {/* 4. Star Icon (Favorites) */}
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors">
          <Star size={18} />
        </button>

        {/* 5. Bell Icon (Notifications) */}
        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors relative">
          <Bell size={18} />
          <span className="absolute top-2 right-2 block h-1.5 w-1.5 rounded-full ring-2 ring-zinc-900 bg-teal-400"></span>
        </button>

        {/* 6. Wallet/Profile Dropdown */}
        <button className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg h-10 px-2 py-1.5 text-zinc-400 hover:bg-zinc-800 transition-colors gap-1.5">
          <Wallet size={16} className="text-zinc-400" />
          <Image src="//logotyp.us/file/solana.svg" height={28} width={28} alt='Solana' className="text-teal-400" />
          <span className="text-sm font-bold text-zinc-200">0</span>
          <span className="text-lg font-thin text-zinc-500">|</span>
          <Image src="/cointoken.png" height={28} width={28} alt='Solana' className="text-teal-400" />
          <span className="text-sm font-bold text-zinc-200">0</span>
          <ChevronDown size={16} className="ml-1.5 text-zinc-400" />
        </button>
        <button className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg h-10 px-2 py-1.5 text-zinc-400 hover:bg-zinc-800 transition-colors gap-1.5">
            <User size={18} />
        </button>

      </div>
    </nav>
    
    {isSearchOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div
            ref={modalRef}
            className="mt-8 w-[min(650px,87%)] max-h-[88vh] bg-[#0f1011] rounded-xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Top chips row */}
            <div className="p-4 border-b border-zinc-800">
              <div className="flex items-center gap-1 flex-wrap">
                {chips.map((c) => (
                  <button
                    key={c}
                    className="text-sm bg-zinc-900/40 text-zinc-200 px-3 cursor-pointer py-1.5 rounded-full border border-zinc-800 hover:bg-zinc-800"
                  >
                    {c}
                  </button>
                ))}

                {/* sort icons / right area (dummy icons matching image) */}
                <div className="ml-auto flex items-center gap-2">
                  <div className="text-xs text-zinc-400 pr-3">Sort by</div>
                  <Clock className="w-4 h-4 flex items-center justify-center rounded bg-zinc-900/30 text-zinc-400 hover:text-indigo-400 cursor-pointer"/>
                  <ChartLine className="w-4 h-4 flex items-center justify-center rounded bg-zinc-900/30 text-zinc-400 hover:text-indigo-400 cursor-pointer"/>
                  <ChartNoAxesColumn className="w-4 h-4 flex items-center justify-center rounded bg-zinc-900/30 text-zinc-400 hover:text-indigo-400 cursor-pointer"/>
                  <Droplet className="w-4 h-4 flex items-center justify-center rounded bg-zinc-900/30 text-zinc-400 hover:text-indigo-400 cursor-pointer"/>
                </div>
              </div>
            </div>

            {/* Large search input area */}
            <div className="p-6">
              <div className="flex items-center gap-3">
                <Search size={20} className="text-zinc-400" />
                <input
                  ref={inputRef}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="bg-transparent w-full text-xl text-zinc-300 placeholder:text-zinc-600 focus:outline-none"
                  placeholder="Search by name, ticker, or CA..."
                  autoFocus
                />

                <div className="ml-4">
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="px-3 py-1 rounded-2xl bg-zinc-800 text-zinc-300 cursor-pointer hover:bg-zinc-700"
                  >
                    Esc
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-800" />

            {/* Body: two-column layout - left: history / results, right: preview (optional) */}
            <div className="flex flex-1 overflow-hidden">
              <div className="w-2/3 p-6 overflow-auto">
                <div className="text-zinc-400 text-sm">History</div>
                <div className="mt-3 grid gap-2">
                  {history.map((h) => (
                    <div key={h} className="text-zinc-300 text-sm py-2 px-3 rounded hover:bg-zinc-900/40 cursor-pointer">
                      {h}
                    </div>
                  ))}
                </div>

                {/* optionally show live results when there's input */}
                {searchValue.length > 0 && (
                  <div className="mt-6">
                    <div className="text-zinc-400 text-sm mb-2">Results</div>
                    <div className="grid gap-2">
                      {/* Sample result row */}
                      <div className="flex items-center justify-between bg-zinc-900/20 px-3 py-2 rounded">
                        <div>
                          <div className="text-zinc-200 font-semibold">MERICA</div>
                          <div className="text-zinc-400 text-xs">{searchValue} — 0xCA...1234</div>
                        </div>
                        <div className="text-zinc-400 text-xs">Price: $0.435</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right preview area (dark image or token preview). This mimics the screenshot's empty right column. */}
            </div>
          </div>
        </div>
      )}
    </>


  );
});

MainNavbar.displayName = 'MainNavbar';
