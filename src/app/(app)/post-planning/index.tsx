import React from "react";
import { View, Text, Image } from "react-native";
import { useWindowDimensions } from "react-native";
import { ProgessBar } from "@/components/progess-bar";
import { GradientBorderCircle } from "@/components/gradient-border-circle";
import { useUserStore } from "@/store/user-store";
import { useQuery } from "@tanstack/react-query";
import { getWeeklyProgess } from "@/functions/get-weekly-progess";
import { useAdminStore } from "@/store/admin-store";
import { Layout } from "@/components/layout";

export default function PostPlanning() {
  const { user, token } = useUserStore();
  const admin = useAdminStore((state) => state.admin);

  const { width } = useWindowDimensions();
  const imageHeight = width * 0.38;

  const { data } = useQuery({
    queryKey: ["get-weekly-progress"],
    queryFn: () =>
      getWeeklyProgess({
        userId: user?.id || admin?.admin.id || "",
        token: token || admin?.token || "",
      }),
  });

  return (
    <Layout title="Planejamento de Postagens">
      <View className="mt-10 flex flex-row flex-wrap justify-center gap-x-3 gap-y-4 px-5">
        {[
          "Segunda",
          "Terça",
          "Quarta",
          "Quinta",
          "Sexta",
          "Sábado",
          "Domingo",
        ].map((day) => (
          <React.Fragment key={day}>
            <GradientBorderCircle key={day} day={day} />
            {day === "Domingo" && <ProgessBar value={data?.progress || 0} />}
          </React.Fragment>
        ))}
      </View>

      <View className="mt-10 px-5">
        <View className="flex overflow-hidden flex-row items-center justify-end border border-primary bg-[#46001A] rounded-[32px] p-2 h-44">
          <Image
            source={require("@/assets/images/hairstyle.png")}
            style={{
              width: imageHeight,
              height: imageHeight,
            }}
            className="absolute -bottom-1 left-2"
            accessibilityLabel="Imagem de um penteado de cabelo."
          />
          <Text className="text-zinc-100 max-w-52 font-zona-semibold">
            Especialistas que planejam têm 78% mais chances de crescer
          </Text>
        </View>
      </View>
    </Layout>
  );
}
