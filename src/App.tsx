/**
 * וט-חולים — Veterinary Calculator
 * Aurora-Clinic shell: sticky header, WebGL hero, tool switcher
 * (drug dosage ⇄ toxicity suite), disclaimer and footer.
 */
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Tools } from './features/Tools';
import { Disclaimer } from './components/Disclaimer';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="relative flex min-h-[100dvh] flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Tools />
        <div className="mx-auto max-w-2xl px-4 pb-4">
          <Disclaimer />
        </div>
      </main>
      <Footer />
    </div>
  );
}
