import {
  MapPin,
  Truck,
  Star,
  MessageCircle,
  Droplet,
  ShieldCheck,
  Award,
  User,
} from "lucide-react";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";
import { getSEOData } from "./action/actions";
import { generatePageMetadata } from "../../../lib/seo-utils";
type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// app/about-us/page.tsx

export async function generateMetadata() {
  return generatePageMetadata("about-us");
}

const AboutUs = () => {
  const testimonials = [
    {
      name: "محمد العتيبي",
      text: "مياه أمواج غيرت تجربتي اليومية! نقاء لا مثيل له وخدمة توصيل لا تتأخر أبدًا.",
      rating: 5,
      avatarColor: "bg-blue-500",
    },
    {
      name: "سارة القحطاني",
      text: "أفضل خيار للمياه النقية! الجودة ممتازة والتوصيل دائمًا في الموعد.",
      rating: 4.5,
      avatarColor: "bg-green-500",
    },
    {
      name: "أحمد السعدي",
      text: "مذاق رائع وخدمة عملاء ودودة جدًا، أمواج فعلاً تستحق الثقة!",
      rating: 5,
      avatarColor: "bg-yellow-500",
    },
    {
      name: "نورة المالكي",
      text: "لا أستطيع العيش بدون أمواج الآن! التوصيل السريع والنقاء المثالي يبهراني.",
      rating: 5,
      avatarColor: "bg-purple-500",
    },
    {
      name: "فيصل الدوسري",
      text: "جودة مضمونة في كل قطرة، أشعر بالفرق منذ اليوم الأول!",
      rating: 4.8,
      avatarColor: "bg-red-500",
    },
  ];

  return (
    <div className="container mx-auto px-6 py-16 bg-gray-50">
      {/* Hero Section */}
      <div className="text-center animate-fade-in flex items-center justify-center flex-col gap-8">
        <h1 className="text-5xl md:text-5xl font-extrabold text-blue-600 leading-tight">
          من نحن | أمواج – مياه نقية لحياة صحية 💧
        </h1>
        <p className="mt-6 text-gray-700 text-xl md:text-2xl max-w-3xl mx-auto">
          نحن في أمواج نؤمن أن الماء ليس مجرد حاجة، بل هو أساس الحياة الصحية.
          نقدم لكم مياهًا نقية بأعلى معايير الجودة العالمية، مع تقنيات تنقية
          متطورة لضمان النقاء والانتعاش كل يوم.
        </p>

        <Link
          href={{ pathname: "/" }}
          className=" px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-secondary hover:text-secondary-foreground transition duration-300"
        >
          تواصلوا معنا الآن
        </Link>
      </div>

      {/* Mission Statement */}
      <div className="mt-16 bg-blue-100 p-8 rounded-xl text-center">
        <h2 className="text-3xl font-bold text-blue-800">رسالتنا</h2>
        <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
          نسعى لتوفير مياه شرب نقية وصحية لكل منزل ومكتب في المملكة، مع الالتزام
          بالاستدامة البيئية والجودة العالمية، لنكون جزءًا من حياة صحية ومستدامة
          لمجتمعنا.
        </p>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16">
        <h2 className="text-4xl font-semibold text-center text-blue-600 mb-10">
          لماذا تختار أمواج؟
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg hover:scale-105 transition duration-300">
            <Truck size={50} className="text-blue-500" />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">
              توصيل فوري
            </h3>
            <p className="text-gray-600 text-center mt-2">
              أسطولنا الحديث يصلك أينما كنت، بسرعة وكفاءة، لضمان راحتك دائمًا.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg hover:scale-105 transition duration-300">
            <Star size={50} className="text-blue-500" />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">
              جودة لا تضاهى
            </h3>
            <p className="text-gray-600 text-center mt-2">
              مياهنا معتمدة عالميًا، مفلترة بتقنيات متطورة لنقاء لا مثيل له.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-white shadow-xl rounded-lg hover:scale-105 transition duration-300">
            <MapPin size={50} className="text-blue-500" />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">
              تغطية شاملة
            </h3>
            <p className="text-gray-600 text-center mt-2">
              فروعنا منتشرة لنكون دائمًا بالقرب منك، جاهزون لخدمتك في أي وقت.
            </p>
          </div>
        </div>
      </div>

      {/* Additional Benefits */}
      <div className="mt-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition duration-300">
            <Droplet size={50} className="text-blue-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4 text-center text-gray-800">
              تركيبة صحية
            </h3>
            <p className="text-gray-600 mt-2 text-center">
              مياه غنية بالمعادن الأساسية لدعم صحتك ونشاطك اليومي.
            </p>
          </div>
          <div className="p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition duration-300">
            <ShieldCheck size={50} className="text-blue-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4 text-center text-gray-800">
              أمان مضمون
            </h3>
            <p className="text-gray-600 mt-2 text-center">
              اختبارات جودة يومية لضمان سلامتك وراحة بالك.
            </p>
          </div>
          <div className="p-6 bg-white shadow-xl rounded-lg hover:shadow-2xl transition duration-300">
            <Award size={50} className="text-blue-500 mx-auto" />
            <h3 className="text-xl font-semibold mt-4 text-center text-gray-800">
              ثقة وتميز
            </h3>
            <p className="text-gray-600 mt-2 text-center">
              نفخر بخدمة آلاف العملاء بجودة وثقة لا تتزعزع.
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Smooth Testimonials Section */}
      <div className="mt-16">
        <h2 className="text-4xl font-semibold text-center text-blue-600 mb-10">
          ماذا يقول عملاؤنا؟
        </h2>
        <div className="relative overflow-hidden py-4">
          <div className="flex animate-seamless-marquee">
            {[...testimonials, ...testimonials].map((review, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 w-80 flex-shrink-0 mx-3 hover:shadow-2xl transition duration-300"
              >
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${review.avatarColor} flex items-center justify-center`}
                  >
                    <User size={24} className="text-white" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {review.name}
                    </h3>
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(review.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic">"{review.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-blue-600 text-white p-8 rounded-xl text-center flex items-center justify-center flex-col gap-8">
        <h2 className="text-3xl font-bold">جاهز لتجربة النقاء؟</h2>
        <p className="mt-4 text-lg">
          انضم إلى آلاف العملاء السعداء واستمتع بمياه أمواج اليوم!
        </p>
        <Link
          href={{ pathname: "/" }}
          className=" px-8 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
        >
          اطلب الآن
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
