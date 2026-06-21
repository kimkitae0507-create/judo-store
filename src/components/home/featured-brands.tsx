import React from "react";
import { ArrowUpRight } from "lucide-react";
import Card, { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Badge from "@/components/ui/badge";

interface Brand {
  name: string;
  engName: string;
  origin: string;
  specialty: string;
  desc: string;
  logoChar: string;
  accentColor: string;
}

const BRANDS: Brand[] = [
  {
    name: "미즈노",
    engName: "MIZUNO",
    origin: "Japan",
    specialty: "전통적 핏 & 최고급 더블위브 코튼",
    desc: "100년 넘는 역사의 장인정신으로 빚어낸 올림픽 국가대표 선호도 1위 유도복 브랜드.",
    logoChar: "M",
    accentColor: "from-blue-600 to-indigo-800",
  },
  {
    name: "쿠사쿠라",
    engName: "KUSAKURA",
    origin: "Japan",
    specialty: "실을 짜는 것부터 염색까지 일체형 수작업",
    desc: "일본 유도 본령의 역사와 전통을 이어가는 정통 명품 유도복 브랜드.",
    logoChar: "九",
    accentColor: "from-red-600 to-amber-700",
  },
  {
    name: "아디다스 유도",
    engName: "ADIDAS",
    origin: "Germany",
    specialty: "인체공학적 슬림핏 & 강한 내구성",
    desc: "글로벌 테크놀로지가 결합되어 유연함과 강도를 극대화한 현대식 유도복.",
    logoChar: "A",
    accentColor: "from-zinc-800 to-zinc-950",
  },
  {
    name: "파이팅 필름",
    engName: "FIGHTING FILMS",
    origin: "United Kingdom",
    specialty: "경량화 기술 & 모던한 자수 디테일",
    desc: "유럽 무대에서 검증받은 최상급 밀착 피팅감과 유니크한 감각의 디자인.",
    logoChar: "FF",
    accentColor: "from-emerald-600 to-teal-800",
  },
];

export default function FeaturedBrands() {
  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-900/40 transition-colors duration-300">
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="primary" className="mb-2">PRO BRANDS</Badge>
          <h2 className="text-h2 font-extrabold text-zinc-900 dark:text-white">
            명가(名家) 브랜드 콜렉션
          </h2>
          <div className="h-1 w-12 bg-red-650 mx-auto mt-4 rounded-full"></div>
          <p className="mt-4 text-zinc-500 dark:text-zinc-400 text-sm">
            세계 유도 연맹(IJF) 공식 시합용 도복을 제작하는 정통 하이엔드 브랜드들을 소개합니다.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid-responsive">
          {BRANDS.map((brand) => (
            <Card
              key={brand.engName}
              interactive
              className="flex flex-col justify-between group"
            >
              <div>
                <CardHeader>
                  {/* Brand Visual Logo Emblem */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${brand.accentColor} text-white font-black text-lg shadow-md`}>
                    {brand.logoChar}
                  </div>

                  {/* Brand Labels */}
                  <div className="flex items-center justify-between mt-2">
                    <h3 className="font-bold text-lg text-zinc-900 dark:text-white leading-tight">
                      {brand.name}
                    </h3>
                    <Badge variant="outline" className="text-[9px] px-1.5 py-0.5">
                      {brand.origin}
                    </Badge>
                  </div>
                  
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider block">
                    {brand.engName}
                  </span>
                </CardHeader>

                <CardContent className="mb-4">
                  <p className="text-zinc-650 dark:text-zinc-400 text-xs leading-relaxed">
                    {brand.desc}
                  </p>
                </CardContent>
              </div>

              {/* Specialty & Action Link */}
              <CardFooter className="flex items-center justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">Specialty</span>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-300 truncate max-w-[150px]">
                    {brand.specialty}
                  </span>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-50 dark:bg-zinc-900 group-hover:bg-zinc-900 dark:group-hover:bg-white text-zinc-600 dark:text-zinc-400 group-hover:text-white dark:group-hover:text-zinc-950 transition-all duration-200 cursor-pointer">
                  <ArrowUpRight className="h-4.5 w-4.5" />
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
