import React from 'react';
import { useTranslation } from "react-i18next";

const nationalHolidays = [
  {
    title: "New Year's Day",
    description: "Celebration of the New Year",
    label: "red",
    day: 1704067200000,
    id: 1704067200000,
    guests: []
  },
  {
    title: "Makar Sankranti/Pongal",
    description: "Harvest festival celebrated in various regions",
    label: "red",
    day: 1705180800000,
    id: 1705180800001,
    guests: []
  },
  {
    title: "Pongal (Continued)",
    description: "Celebration of the harvest in Tamil Nadu",
    label: "red",
    day: 1705267200000,
    id: 1705267200002,
    guests: []
  },
  {
    title: "Republic Day",
    description: "Celebration of the adoption of the Constitution",
    label: "red",
    day: 1706265600000,
    id: 1706265600003,
    guests: []
  },
  {
    title: "Vasant Panchami",
    description: "Festival marking the arrival of spring",
    label: "red",
    day: 1707648000000,
    id: 1707648000004,
    guests: []
  },
  {
    title: "Maha Shivaratri",
    description: "Night dedicated to Lord Shiva",
    label: "red",
    day: 1708924800000,
    id: 1708924800005,
    guests: []
  },
  {
    title: "Losar",
    description: "Tibetan New Year celebration",
    label: "red",
    day: 1709270400000,
    id: 1709270400006,
    guests: []
  },
  {
    title: "Holi",
    description: "Festival of colors",
    label: "red",
    day: 1711622400000,
    id: 1711622400007,
    guests: []
  },
  {
    title: "Good Friday",
    description: "Commemoration of the crucifixion of Jesus Christ",
    label: "red",
    day: 1712217600000,
    id: 1712217600008,
    guests: []
  },
  {
    title: "Id-ul-Fitr (Ramzan Eid)",
    description: "Celebration marking the end of Ramadan",
    label: "red",
    day: 1713052800000,
    id: 1713052800009,
    guests: []
  },
  {
    title: "Baisakhi",
    description: "Harvest festival celebrated in Punjab",
    label: "red",
    day: 1713993600000,
    id: 1713993600010,
    guests: []
  },
  {
    title: "Dr. Ambedkar Jayanti",
    description: "Birth anniversary of Dr. B.R. Ambedkar",
    label: "red",
    day: 1713993600001,
    id: 1713993600011,
    guests: []
  },
  {
    title: "Tamil New Year",
    description: "Celebration of the Tamil New Year",
    label: "red",
    day: 1713993600002,
    id: 1713993600012,
    guests: []
  },
  {
    title: "Mahavir Jayanti",
    description: "Birth anniversary of Lord Mahavir",
    label: "red",
    day: 1714425600000,
    id: 1714425600003,
    guests: []
  },
  {
    title: "Labour Day",
    description: "Celebration of workers' rights",
    label: "red",
    day: 1714876800000,
    id: 1714876800004,
    guests: []
  },
  {
    title: "Buddha Purnima",
    description: "Celebration of the birth of Buddha",
    label: "red",
    day: 1715827200000,
    id: 1715827200005,
    guests: []
  },
  {
    title: "Bakrid / Eid al-Adha",
    description: "Festival commemorating the willingness of Ibrahim to sacrifice his son",
    label: "red",
    day: 1717372800000,
    id: 1717372800006,
    guests: []
  },
  {
    title: "Ashadhi Ekadashi",
    description: "Hindu festival dedicated to Lord Vishnu",
    label: "red",
    day: 1717929600000,
    id: 1717929600007,
    guests: []
  },
  {
    title: "Muharram",
    description: "First month of the Islamic lunar calendar",
    label: "red",
    day: 1718534400000,
    id: 1718534400008,
    guests: []
  },
  {
    title: "Independence Day",
    description: "Celebration of India's independence from British rule",
    label: "red",
    day: 1718937600000,
    id: 1718937600009,
    guests: []
  },
  {
    title: "Raksha Bandhan",
    description: "Festival celebrating the bond between brothers and sisters",
    label: "red",
    day: 1719264000000,
    id: 1719264000010,
    guests: []
  },
  {
    title: "Krishna Janmashtami",
    description: "Celebration of the birth of Lord Krishna",
    label: "red",
    day: 1719513600000,
    id: 1719513600011,
    guests: []
  },
  {
    title: "Ganesh Chaturthi",
    description: "Festival celebrating the birth of Lord Ganesha",
    label: "red",
    day: 1720454400000,
    id: 1720454400012,
    guests: []
  },
  {
    title: "Teacher's Day",
    description: "Celebration of teachers and their contributions",
    label: "red",
    day: 1720540800000,
    id: 1720540800003,
    guests: []
  },
  {
    title: "Gandhi Jayanti",
    description: "Birth anniversary of Mahatma Gandhi",
    label: "red",
    day: 1720944000000,
    id: 1720944000004,
    guests: []
  },
  {
    title: "Dussehra",
    description: "Festival celebrating the victory of good over evil",
    label: "red",
    day: 1721740800000,
    id: 1721740800005,
    guests: []
  },
  {
    title: "Eid-e-Milad",
    description: "Celebration of the birth of Prophet Muhammad",
    label: "red",
    day: 1722201600000,
    id: 1722201600006,
    guests: []
  },
  {
    title: "Diwali",
    description: "Festival of lights",
    label: "red",
    day: 1722902400000,
    id: 1722902400007,
    guests: []
  },
  {
    title: "Diwali Holiday (Varies by Region)",
    description: "Holiday for the Diwali festival, varies by region",
    label: "red",
    day: 1722988800000,
    id: 1722988800008,
    guests: []
  },
  {
    title: "Govardhan Puja",
    description: "Celebration of Lord Krishna lifting the Govardhan hill",
    label: "red",
    day: 1723075200000,
    id: 1723075200009,
    guests: []
  },
  {
    title: "Bhai Dooj",
    description: "Celebration of the bond between brothers and sisters",
    label: "red",
    day: 1723161600000,
    id: 1723161600010,
    guests: []
  },
  {
    title: "Guru Nanak Jayanti",
    description: "Birth anniversary of Guru Nanak, the founder of Sikhism",
    label: "red",
    day: 1723622400000,
    id: 1723622400011,
    guests: []
  },
  {
    title: "Christmas",
    description: "Celebration of the birth of Jesus Christ",
    label: "red",
    day: 1724947200000,
    id: 1724947200012,
    guests: []
  }
];

export default function GetAddonsPage() {
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">National Holidays 2024</h1>
      
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-600 font-semibold">
            {t("title")}
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-600 font-semibold">
            {t("description")}
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-600 font-semibold">
            {t("day")}
            </th>
          </tr>
        </thead>
        <tbody>
          {nationalHolidays.map((holiday) => (
            <tr key={holiday.id} className="hover:bg-gray-100">
              <td className="px-6 py-4 border-b border-gray-300">{holiday.title}</td>
              <td className="px-6 py-4 border-b border-gray-300">{holiday.description}</td>
              <td className="px-6 py-4 border-b border-gray-300">{new Date(holiday.day).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
