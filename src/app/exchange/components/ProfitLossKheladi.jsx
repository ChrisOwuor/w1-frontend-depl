import React, { useContext, useEffect, useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { AuthContext } from "@/app/context/AuthContext";
import { NAVContext } from "@/app/context/NavContext";
import { fetchPL } from "@/app/api/exchange";




const ProfitLossKheladi = () => {
  const { userData } = useContext(AuthContext);
  const { setCurrentCenter } = useContext(NAVContext);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPL, setTotalPL] = useState("");
  const [pl, setPl] = useState([]);

    
function calculateTotalProfitLoss(arrayOfObjects) {
  const totalProfitLoss = arrayOfObjects.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.profitLoss;
  }, 0);
  return totalProfitLoss;
}
let eventOptions = [
  { value: "ALL", label: "All Sports" },
  { value: "4", label: "Cricket" },
  { value: "1", label: "Football" },
  { value: "2", label: "Tennis" },
  { value: "99998", label: "Int Casino" },
  { value: "99991", label: "Sports book" },
  { value: "7", label: "Horse Racing" },
  { value: "4339", label: "Greyhound Racing" },
  { value: "99990", label: "Binary" },
  { value: "99994", label: "Kabaddi" },
  { value: "2378961", label: "Politics" },
  { value: "7522", label: "Basketball" },
  { value: "7511", label: "Baseball" },
  { value: "20", label: "Table Tennis" },
  { value: "998917", label: "Volleyball" },
  { value: "7524", label: "Ice Hockey" },
  { value: "5", label: "Rugby" },
  { value: "26420387", label: "Mixed Martial Arts" },
  { value: "3503", label: "Darts" },
  { value: "29", label: "Futsal" },
];


  useEffect(() => {
    (async () => {
      const pl_arr = await fetchPL();
      if (pl_arr.length > 0) {
        setPl(pl_arr);
        const total_pl = calculateTotalProfitLoss(pl_arr);
        setTotalPL(total_pl);
      }
    })();
  }, []);
  return (
    <div className="px-[12px] ">
      <div className="loginpage">
        <div className="rw  ">
          <div className="kh:px-[12px]">
            <div className="header-password -px-[12px] mt-[1rem] flex-flex-wrap">
              <div className="px-[0.5rem] w-full">
                <div className="headerLine">
                  <h6 className="text-[#5700a3] text-[20px] overflow-hidden uppercase text-center font-[700] z-[1] relative">
                    Profit Loss (Total P/L : IR 0)
                  </h6>
                </div>
              </div>
            </div>
            <div className=" my-[15px] mx-0" id="filter">
              <form action="">
                <div className="filter-contents flex flex-wrap w-full ">
                  <div className="filter-1 px-1 w-[25%] kh:w-[16.66666667%] shrink-0 grow-1 basis">
                    <select
                      name=""
                      id=""
                      class="form-control  w-full block ng-pristine ng-valid ng-touched"
                    >
                      {eventOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-1 px-1 w-[25%] kh:w-[16.66666667%]">
                    <input
                      _ngcontent-mow-c83=""
                      type="date"
                      id="start_date"
                      onChange={(e) => setStartDate(e.target.value)}
                      value={startDate}
                      placeholder="Start Date"
                      formcontrolname="start_date"
                      class="form-control w-full  ng-untouched ng-pristine ng-valid"
                    />
                  </div>
                  <div className="filter-1 px-1 w-[25%] kh:w-[16.66666667%]">
                    <input
                      _ngcontent-mow-c83=""
                      type="date"
                      id="end_date"
                      onChange={(e) => setEndDate(e.target.value)}
                      value={endDate}
                      placeholder="End Date"
                      formcontrolname="end_date"
                      class="form-control w-full block  ng-untouched ng-pristine ng-valid"
                    />
                  </div>
                  <div className="filter-1 px-1 w-[25%] kh:w-[16.66666667%]">
                    <button _ngcontent-mow-c83="" type="submit" class="btn-get">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
           

            <div className="overflow-x-auto w-full ">
              <table
                style={{ borderCollapse: "collapse" }}
                className="w-full bg-white text-sm mb-[1rem]  text-left rtl:text-right text-black"
              >
                <thead className="">
                  <tr className="">
                    <th scope="col">No</th>
                    <th scope="col">Date</th>
                    <th scope="col">Event</th>
                    <th scope="col">Comm In</th>
                    <th scope="col">Comm Out</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Total</th>
                    <th scope="col">Info</th>
                  </tr>
                </thead>
                <tbody className="">
                  {userData != {} &&
                    pl &&
                    pl.length > 0 &&
                    pl.reverse().map((item, index) => (
                      <tr key={index} className={``}>
                        <td>{item.sportName || item.gameName}</td>
                        <td>
                          {item.profitLoss < 0 ? (
                            <span className="text-red-500">
                              {parseFloat(item.profitLoss).toFixed(2)}
                            </span>
                          ) : (
                            <span className="text-green-400">
                              {parseFloat(item.profitLoss).toFixed(2)}
                            </span>
                          )}
                        </td>
                        <td>{parseDateTime(item.settledDate)}</td>
                        <td className={` whitespace-nowrap overflow-x-auto`}>
                          {item.narration}
                        </td>
                        <td className={` text-danger`}>
                          {item.debit.toFixed(2)}
                        </td>
                        <td className={` text-success`}>
                          {item.credit.toFixed(2)}
                        </td>
                        <td className={` text-success`}>
                          {item.runningBalance.toFixed(2)}
                        </td>
                        </tr>
                        
                    ))}
                </tbody>
              </table>
            </div>

            {pl.length === 0 && (
              <p className=" py-2 text-[13px] text-black tracking-wide">
                No data found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossKheladi;
