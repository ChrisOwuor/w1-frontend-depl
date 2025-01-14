"use client";

import { NAVProvider } from "../context/NavContext";
import GapView from "../exchange/components/casino/GapCasino";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "../context/AuthContext";
import { CompetitionProvider } from "../context/exchange/CompetitonContext";
import { MarketBookProvider } from "../context/exchange/MarketBookContext";
import { OpenExchangeEventProvider } from "../context/exchange/OpenExchangeEventProvider";
import { UserExchangeBetslipProvider } from "../context/exchange/UserExchangeBetslipContext";
import { MarketsProvider } from "../context/exchange/MarketsContext";
import { MyBetsProvider } from "../context/MybetsContext";
import { CasinoProvider } from "../context/CasinoContext";

const Wrapper = () => {
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
                        <CasinoProvider>
                          {/* <SocketProvider> */}
                          <GapView />
                          {/* </SocketProvider> */}
                        </CasinoProvider>
                      </NAVProvider>
                    </MantineProvider>
                  </MyBetsProvider>
                </MarketsProvider>
              </MarketBookProvider>
            </CompetitionProvider>
          </UserExchangeBetslipProvider>
        </OpenExchangeEventProvider>
      </AuthProvider>
    
  );
};

export default Wrapper;
