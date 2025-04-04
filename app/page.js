import Image from "next/image";
import PriceBenefitsItem from "@/components/price-benefits-item";
import productDemo from "@/public/ctalyst-hero.png";
import FAQItem from "@/components/faq-item";

export default function Home() {
  const freePlanBenefits = [
    "Up to 5 links per month",
    "Basic CTA Customization",
    "Unlimited Link Sharing",
    "Responsive CTA Overlays",
    "No Credit Card Required",
  ];

  const proPlanBenefits = [
    "Unlimited CTA Links – No restrictions",
    "Advanced CTA Customization",
    "Custom Branded Links",
    "Priority Support",
  ];

  const faq = [
    {
      question: "How does the free plan work?",
      answer:
        "The free plan allows you to create up to 5 links per month with basic analytics.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes! You can cancel your subscription at any time with no hidden fees.",
    },
    { question: "I have another question", answer: "Loreum Ipseum" },
  ];

  return (
    <main>
      <div className="min-h-screen text-black">
        {/* Header */}
        <header className="w-full py-4 px-6 flex justify-between items-center shadow-md">
          <Image src="/logo.png" width={184} height={49} alt="CTAlyst logo" />
          <div className="space-x-4 flex">
            <div className="space-x-4 max-md:hidden flex items-center">
              <a className="link link-hover" href="#pricing">
                Pricing
              </a>
              <a className="link link-hover" href="#faq">
                FAQ
              </a>
            </div>
            <button className="btn bg-[#5DA2D5] hover:bg-[#5294c6] text-white">
              Sign In
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="py-32 px-8 bg-[#90CCF4] text-white flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12">
          <div className="text-center lg:text-left max-w-2xl lg:max-w-xl ">
            <h1 className="text-5xl font-bold animate-fadeInDown">
              The catalyst for better link conversions
            </h1>
            <p className="text-lg mt-4 max-w-2xl animate-fadeInUp">
              Add CTAs to YouTube videos & share!. Drive engagement and
              conversions seamlessly.
            </p>
            <button className="btn bg-[#F78888] hover:bg-[#e37d7d] border-none mt-6 text-white px-6 py-3">
              Get Started
            </button>
          </div>
          <Image
            src={productDemo}
            alt="Product demo"
            className="w-[450px] rounded-xl"
          />
        </section>

        {/* Features */}
        <section className="py-32 px-8 bg-white">
          <h2 className="text-3xl font-bold text-center mb-8">
            Why Use Our Service?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F3D250] text-black rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold">Easy to Use</h3>
              <p>Create links with CTAs in seconds.</p>
            </div>
            <div className="p-6 bg-[#90CCF4] text-black rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold">Boost Engagement</h3>
              <p>Drive more conversions with CTA overlays.</p>
            </div>
            <div className="p-6 bg-[#F78888] text-black rounded-lg shadow-md text-center">
              <h3 className="text-xl font-bold">Track Performance</h3>
              <p>Monitor link analytics easily.</p>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 px-8 bg-[#ECECEC]">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-white rounded-lg shadow-md space-y-6 min-w-96 mx-auto md:min-w-0 md:mx-0">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Free</h3>
                <div className="flex gap-1">
                  <span className="text-2xl font-black align-top">$</span>
                  <span className="text-5xl font-black">0</span>
                  <div className="text-xs font-medium opacity-60 self-end flex flex-col">
                    <span className="uppercase">usd/</span>
                    <span>month</span>
                  </div>
                </div>
                <p>Create your first links!</p>
              </div>
              <button className="btn bg-[#5DA2D5] hover:bg-[#5294c6] text-white mt-4 w-full">
                Get Started
              </button>
              <ul className="space-y-2">
                {freePlanBenefits.map((benefit) => (
                  <PriceBenefitsItem key={benefit}>{benefit}</PriceBenefitsItem>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-[#F3D250] rounded-lg shadow-md space-y-6 min-w-96 mx-auto md:min-w-0 md:mx-0">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Pro</h3>
                <div className="flex gap-1">
                  <span className="text-2xl font-black self-start">$</span>
                  <span className="text-5xl font-black">5</span>
                  <div className="text-xs font-medium opacity-60 self-end flex flex-col">
                    <span className="uppercase">usd/</span>
                    <span>month</span>
                  </div>
                </div>
                <p>Boost your traffic by going PRO!</p>
              </div>
              <button className="btn bg-[#F78888] hover:bg-[#e37d7d] border-none text-white mt-4 w-full">
                Upgrade Now
              </button>
              <ul className="space-y-2">
                {proPlanBenefits.map((benefit) => (
                  <PriceBenefitsItem key={benefit}>{benefit}</PriceBenefitsItem>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-32 px-8 bg-white">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <ul className="max-w-3xl mx-auto space-y-4">
            {faq.map((qa) => (
              <FAQItem key={qa.question} qa={qa} />
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="py-6 bg-[#5DA2D5] text-center text-white">
          <p>© 2025 CTAlyst. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
