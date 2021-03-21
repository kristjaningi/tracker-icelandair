import aircrafts from '../../data/fleet.json';

export default async function getAirplaneName(req: any, res: any) {
  const faFlightID = req.query.faFlightID;

  const response = await fetch(
    `https://flightxml.flightaware.com/json/FlightXML2/AirlineFlightInfo?faFlightID=${faFlightID}`,
    {
      headers: {
        authorization: `Basic ${process.env.FLIGHT_AWARE_API_KEY}`,
      },
    }
  );

  const data = await response.json();

  const tailNumber = data.AirlineFlightInfoResult.tailnumber;

  console.log(tailNumber);

  const result = aircrafts.filter((chain) => {
    return chain.registration === tailNumber;
  })[0].nickname;

  console.log(result);

  if (result.length === 0) {
    console.log('no result');
    return res.status(200).json({ result: 'Icelandair' });
  }

  // const result = aircrafts.filter((chain) => {
  //   return chain.registration === tailNumber;
  // })[0].nickname;

  // console.log(result);

  res.status(200).json({ result });
}
