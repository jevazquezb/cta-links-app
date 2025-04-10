import { auth } from "@/auth";
import connectMongo from "@/lib/mongoose";
import User from "@/models/user";
import Image from "next/image";
import PriceBenefitsItem from "@/components/price-benefits-item";
import productDemo from "@/public/ctalyst-hero.png";
import FAQItem from "@/components/faq-item";
import ButtonLogin from "@/components/button-login";
import ButtonCheckout from "@/components/button-checkout";

const getUser = async () => {
  const session = await auth();

  await connectMongo();

  const user = await User.findById(session?.user?.id);

  return { session, user };
};

export default async function Home() {
  const { session, user } = await getUser();

  const blueBtnStyles = "bg-[#5DA2D5] hover:bg-[#5294c6]";
  const redBtnStyles = "bg-[#F78888] hover:bg-[#e37d7d] border-none";
  const proBtnStyles = "bg-[#00AEFF] hover:bg-[#0094e6] border-none";
  const fullWidthBtn = "w-full";
  const btnText = {
    signIn: "Sign In",
    getStarted: "Get Started",
    upgradeNow: "Upgrade Now",
  };

  const freePlanBenefits = [
    "Up to 3 active CTA links",
    "Unlimited Link Sharing",
    "Responsive CTA Overlays",
    "No Credit Card Required",
  ];

  const proPlanBenefits = [
    "Unlimited CTA Links – No restrictions",
    "CTA Customization",
    "Custom Branded Links",
    "Priority Support",
  ];

  const faq = [
    {
      question: "How does the free plan work?",
      answer:
        "The free plan allows you to create up to 3 links with basic analytics.",
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
          <Image
            src="/zappyvid-logo.png"
            width={184}
            height={49}
            alt="CTAlyst logo"
          />
          <div className="space-x-4 flex">
            <div className="space-x-4 max-md:hidden flex items-center">
              <a className="link link-hover" href="#pricing">
                Pricing
              </a>
              <a className="link link-hover" href="#faq">
                FAQ
              </a>
            </div>
            <ButtonLogin
              session={session}
              text={btnText.signIn}
              extraStyles={blueBtnStyles}
            />
          </div>
        </header>

        {/* Hero */}
        <section className="py-32 px-8 bg-[#90CCF4] text-white flex flex-col lg:flex-row justify-center items-center lg:items-start gap-12">
          <div className="text-center lg:text-left max-w-2xl lg:max-w-xl ">
            <h1 className="text-5xl font-bold animate-fadeInDown">
              Turn Views into Action — One Video at a Time.
            </h1>
            <p className="text-lg mt-4 mb-6 max-w-2xl animate-fadeInUp">
              Add CTAs to YouTube videos & share! Drive engagement and
              conversions seamlessly.
            </p>
            <ButtonLogin
              session={session}
              text={btnText.getStarted}
              extraStyles={redBtnStyles}
            />
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
            <div className="p-6 text-black rounded-lg shadow-md border-4 border-[#5fbaf7] flex gap-4 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="min-w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
                />
              </svg>
              <div>
                <h3 className="text-xl font-bold">Easy to Use</h3>
                <p>Create links with CTAs in seconds.</p>
              </div>
            </div>
            <div className="p-6 text-black rounded-lg shadow-md border-4 border-[#5fbaf7] flex gap-4 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="min-w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                />
              </svg>
              <div>
                <h3 className="text-xl font-bold">Boost Engagement</h3>
                <p>Drive more conversions with CTA overlays.</p>
              </div>
            </div>
            <div className="p-6 text-black rounded-lg shadow-md border-4 border-[#5fbaf7] flex gap-4 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="min-w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
              <div>
                <h3 className="text-xl font-bold">Track Performance</h3>
                <p>Monitor link analytics easily.</p>
              </div>
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
              {!session && (
                <ButtonLogin
                  session={session}
                  text={btnText.getStarted}
                  extraStyles={`${blueBtnStyles} ${fullWidthBtn}`}
                />
              )}

              <ul className="space-y-2">
                {freePlanBenefits.map((benefit) => (
                  <PriceBenefitsItem key={benefit}>{benefit}</PriceBenefitsItem>
                ))}
              </ul>
            </div>
            <div className="p-6 bg-white border-4 border-[#00AEFF] rounded-lg shadow-md space-y-6 min-w-96 mx-auto md:min-w-0 md:mx-0">
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
              {session ? (
                !user?.isPro && (
                  <ButtonCheckout
                    text={btnText.upgradeNow}
                    extraStyles={`${proBtnStyles} ${fullWidthBtn}`}
                  />
                )
              ) : (
                <ButtonLogin
                  session={session}
                  text={btnText.upgradeNow}
                  extraStyles={`${proBtnStyles} ${fullWidthBtn}`}
                />
              )}
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
          <p>© 2025 ZappyVid. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
