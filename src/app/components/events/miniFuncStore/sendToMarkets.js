export const handleMarkets = (sport_id, eventObj) => {

  localStorage.removeItem("eObj");
  localStorage.setItem("eObj", JSON.stringify(eventObj));

  window.location.replace(`/e/${sport_id}/${eventObj.eventD.id}`);

  return 0;
};
