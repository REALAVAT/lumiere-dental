export const THEME_STORAGE_KEY = "lumiere-theme";

const script = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var d=t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;var e=document.documentElement;if(d)e.classList.add("dark");e.style.colorScheme=d?"dark":"light"}catch(_){}})()`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
