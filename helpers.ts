export function formatAirportCode(airport: string) {
  if (airport.length > 4 || airport.length < 4 || airport.length == 0) {
    // console.log(airport, ' string is to long);
    return '????';
  }

  return airport;
}
