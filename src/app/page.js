"use client";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext";
import { NAVProvider } from "./context/NavContext";
import { CompetitionProvider } from "./context/exchange/CompetitonContext";
import { MarketBookProvider } from "./context/exchange/MarketBookContext";
import { OpenExchangeEventProvider } from "./context/exchange/OpenExchangeEventProvider";
import { UserExchangeBetslipProvider } from "./context/exchange/UserExchangeBetslipContext";
import Exchange from "./exchange/components/Exchange";
import { MarketsProvider } from "./context/exchange/MarketsContext";
import { MyBetsProvider } from "./context/MybetsContext";

export default function page() {

  return (
    <AuthProvider>

      <OpenExchangeEventProvider>
        <UserExchangeBetslipProvider>
          <CompetitionProvider>
            <MarketBookProvider>
              <MarketsProvider>

                <MyBetsProvider>
                  <MantineProvider>
                    <NAVProvider>
                      <Exchange />

                    </NAVProvider>
                  </MantineProvider>
                </MyBetsProvider>

              </MarketsProvider>
            </MarketBookProvider>
          </CompetitionProvider>
        </UserExchangeBetslipProvider>
      </OpenExchangeEventProvider>
    </AuthProvider >

  );
}
