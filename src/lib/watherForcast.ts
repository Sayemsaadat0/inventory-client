export const weatherData = async (cityName: string = 'Dhaka') => {
    const monthNames: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const dayNames: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const d = new Date();
    const year = d.getFullYear();
    const date = d.getDate();
    const month = monthNames[d.getMonth()];
    const day = dayNames[d.getDay()];

    const apiKey = '0cefbdd8089c7b724b58eac94e84c704';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const temp = Math.floor(data.main.temp - 273.15); // Convert from Kelvin to Celsius
        const feel = data.weather[0].main;
        const name = data.name;

        return { temp, feel, name, date, month, year, day };
    } catch (error) {
        console.error(error)
    }
};

