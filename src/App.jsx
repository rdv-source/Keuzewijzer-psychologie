import React, { useState } from "react";

function TrainingenKeuzewijzer() {
  const statements = [
    { id: 2, text: "Ik werk liever samen met anderen dan alleen.", scores: { gedragsobservatie: 2, vragenlijst: 2, registreren: 1 } },
    { id: 4, text: "Ik vind het interessant om gedrag of data systematisch te analyseren.", scores: { experimenteren: 2, registreren: 2, vragenlijst: 2 } },
    { id: 6, text: "Ik vind het leuk om feedback te geven en ontvangen van medestudenten.", scores: { registreren: 1, gedragsobservatie: 2, vragenlijst: 2 } },
    { id: 7, text: "Ik vind het niet erg om wekelijks opdrachten bij te houden.", scores: { gedragsobservatie: 2, vragenlijst: 2 } },
    { id: 10, text: "Ik maak liever opdrachten op mijn laptop dan dat ik opdrachten presenteer.", scores: { experimenteren: 1, programmeren: 1, registreren: 2 } },
    { id: 11, text: "Ik wil graag leren hoe computers en apparatuur gebruikt worden in onderzoek.", scores: { experimenteren: 3, registreren: 2 } },
    { id: 13, text: "Ik werk graag zelfstandig aan opdrachten zonder verplichte werkgroepen.", scores: { experimenteren: 2, programmeren: 3, registreren: 2 } },
    { id: 15, text: "Ik gebruik graag programma’s zoals Excel om resultaten te verwerken.", scores: { experimenteren: 2, registreren: 2 } },
    { id: 17, text: "Ik ben nieuwsgierig naar hoe experimenten technisch worden opgebouwd.", scores: { experimenteren: 3 } },
    
    { id: 22, text: "Ik vind het interessant om data of informatie automatisch te verwerken.", scores: { programmeren: 3, registreren: 1 } },
    { id: 23, text: "Ik wil leren hoe je visualisaties of stimuli maakt voor onderzoek.", scores: { programmeren: 3 } },
    { id: 28, text: "Ik wil leren welke manier van dataverzameling past bij een onderzoeksvraag.", scores: { registreren: 3 } },
    { id: 29, text: "Ik ben geïnteresseerd in hersenen, gedrag en fysiologische maten.", scores: { registreren: 3 } },
    { id: 35, text: "Ik vind peerfeedback nuttig om mijn werk te verbeteren.", scores: { registreren: 2, vragenlijst: 2 } },
    { id: 30, text: "Het lijkt mij leuk om onderzoeksdata te analyseren en hierover te rapporteren", scores: { registreren: 3, experimenteren: 1 } },
    { id: 36, text: "Ik vind het interessant om te zien hoe mensen zich gedragen in verschillende situaties\.", scores: { gedragsobservatie: 3 } },
    { id: 37, text: "Ik vind het interessant om gedrag objectief te beoordelen.", scores: { gedragsobservatie: 3 } },
    { id: 38, text: "Ik werk graag samen aan groepsopdrachten.", scores: { gedragsobservatie: 2, vragenlijst: 2 } },
    { id: 40, text: "Ik vind mondeling presenteren leuk of leerzaam.", scores: { gedragsobservatie: 3 } },
    { id: 42, text: "Ik werk graag aan wekelijkse opdrachten.", scores: { gedragsobservatie: 2, vragenlijst: 2 } },
    { id: 45, text: "Ik besteed graag regelmatig tijd per week aan een vak in plaats van alles aan het einde.", scores: { gedragsobservatie: 2, vragenlijst: 2 } },
    { id: 46, text: "Ik vind het interessant om psychologische eigenschappen meetbaar te maken.", scores: { vragenlijst: 3 } },
    { id: 47, text: "Ik denk graag kritisch na over betrouwbaarheid en validiteit van metingen.", scores: { vragenlijst: 3, gedragsobservatie: 1 } },
    { id: 52, text: "Ik vind statistische analyses interessant.", scores: { vragenlijst: 3, registreren: 2 } },
    { id: 54, text: "Ik vind peerfeedback nuttig tijdens een project.", scores: { vragenlijst: 2, registreren: 1 } },
    { id: 55, text: "Ik vind verplichte werkgroepen prettig omdat ze structuur geven.", scores: { vragenlijst: 2, gedragsobservatie: 1 } },
    { id: 57, text: "Ik werk liever met data en computers dan met mondelinge presentaties.", scores: { programmeren: 2, experimenteren: 2, registreren: 2 } },
    { id: 59, text: "Ik werk liever individueel dan in een vaste groep.", scores: { programmeren: 3, experimenteren: 2, registreren: 2 } },
    { id: 60, text: "Ik vind nauwkeurig meten interessanter dan creatief ontwerpen.", scores: { registreren: 3, experimenteren: 1 } },
  ];

  const options = [
    { label: "Helemaal oneens", value: -2 },
    { label: "Oneens", value: -1 },
    { label: "Neutraal", value: 0 },
    { label: "Eens", value: 1 },
    { label: "Helemaal eens", value: 2 },
  ];

  const descriptions = {
    experimenteren:
      "Experimenteren past goed bij studenten die technisch nieuwsgierig zijn, graag analyseren en zelfstandig willen werken aan onderzoeksopstellingen en data.",
    programmeren:
      "Programmeren past goed bij studenten die interesse hebben in code, automatisering, computers en het bouwen van digitale toepassingen voor onderzoek.",
    registreren:
      "Registreren past goed bij studenten die geïnteresseerd zijn in meetmethoden, fysiologische data, onderzoek en nauwkeurige analyses.",
    gedragsobservatie:
      "Gedragsobservatie past goed bij studenten die graag gedrag observeren, samenwerken en praktijkgericht bezig zijn.",
    vragenlijst:
      "Vragenlijstconstructie past goed bij studenten die kritisch nadenken over metingen, analyses en het ontwerpen van vragenlijsten.",
  };

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const calculateResult = () => {
    const totals = {
      experimenteren: 0,
      programmeren: 0,
      registreren: 0,
      gedragsobservatie: 0,
      vragenlijst: 0,
    };

    statements.forEach((statement) => {
      const answer = answers[statement.id] || 0;

      Object.entries(statement.scores).forEach(([training, weight]) => {
        totals[training] += answer * weight;
      });
    });

    const bestMatch = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];

    setResult({
      training: bestMatch[0],
      score: bestMatch[1],
      totals,
    });
  };

  const formatTitle = (key) => {
    const map = {
      experimenteren: "Experimenteren",
      programmeren: "Programmeren",
      registreren: "Registreren",
      gedragsobservatie: "Gedragsobservatie",
      vragenlijst: "Vragenlijstconstructie",
    };

    return map[key];
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-2">
          Keuzewijzer Trainingen Psychologie
        </h1>

        <p className="text-slate-600 mb-8">
          Beantwoord de onderstaande stellingen en ontdek welke training het
          beste bij jou past.
        </p>

        <div className="space-y-8">
          {statements.map((statement, index) => (
            <div
              key={statement.id}
              className="border border-slate-200 rounded-2xl p-5"
            >
              <p className="font-semibold mb-4">
                {index + 1}. {statement.text}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleAnswer(statement.id, option.value)}
                    className={`p-3 rounded-xl border transition-all font-medium flex items-center justify-center gap-2 ${
                      answers[statement.id] === option.value
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg ring-2 ring-blue-300"
                        : "bg-white hover:bg-slate-50 border-slate-300"
                    }`}
                  >
                    {answers[statement.id] === option.value && (
                      <span className="text-lg">✓</span>
                    )}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={calculateResult}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:opacity-90"
          >
            Bekijk mijn uitslag
          </button>
        </div>

        {result && (
          <div className="mt-10 bg-slate-50 border border-slate-200 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-4">Jouw beste match</h2>

            <div className="text-2xl font-semibold mb-3">
              {formatTitle(result.training)}
            </div>

            <p className="text-slate-700 mb-6">
              {descriptions[result.training]}
            </p>

            <div>
              <h3 className="font-semibold mb-3">Scores per training</h3>

              <div className="space-y-3">
                {Object.entries(result.totals)
                  .sort((a, b) => b[1] - a[1])
                  .map(([training, score]) => (
                    <div
                      key={training}
                      className="bg-white border border-slate-200 rounded-xl p-4"
                    >
                      <span className="font-bold">{formatTitle(training)} {score}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}



/*
========================================
BESTANDSINDELING
========================================

Gebruik deze code als 2 losse bestanden/components:

1. TrainingenKeuzewijzer.jsx
   -> bevat: export default function Keuzewijzer()

2. MaatschappelijkeVakkenKeuzewijzer.jsx
   -> bevat: export function MaatschappelijkeVakkenKeuzewijzer()

Kopieer beide componenten los van elkaar in aparte bestanden.
========================================
*/

// ================================
// MAATSCHAPPELIJKE VAKKEN KEUZEWIJZER
// ================================

function MaatschappelijkeVakkenKeuzewijzer() {
  const statements = [
    {
      id: 1,
      text: "Ik vind het interessant om te begrijpen waarom mensen bepaald gedrag blijven herhalen.",
      scores: { motivatie: 3 },
    },
    {
      id: 2,
      text: "Ik denk graag kritisch na over menselijk gedrag.",
      scores: { motivatie: 2, identiteit: 1 },
    },
    {
      id: 3,
      text: "Ik vind het interessant hoe motivatie ontstaat.",
      scores: { motivatie: 3 },
    },
    {
      id: 4,
      text: "Ik wil begrijpen waarom duurzame gedragsverandering moeilijk is.",
      scores: { motivatie: 3 },
    },
    {
      id: 5,
      text: "Ik vind het leuk om feedback te geven en ontvangen tijdens opdrachten.",
      scores: { motivatie: 1, samenleving: 1, identiteit: 1 },
    },
    {
      id: 6,
      text: "Ik ben geïnteresseerd in sociale interacties tussen mensen.",
      scores: { samenleving: 3 },
    },
    {
      id: 7,
      text: "Ik denk graag na over maatschappelijke problemen zoals discriminatie.",
      scores: { samenleving: 3, identiteit: 1 },
    },
    {
      id: 8,
      text: "Ik vind groepsgedrag interessanter dan individueel gedrag.",
      scores: { samenleving: 3 },
    },
    {
      id: 9,
      text: "Ik wil leren hoe wetenschappelijke kennis begrijpelijk gemaakt kan worden voor een breed publiek.",
      scores: { samenleving: 2, identiteit: 2 },
    },
    {
      id: 10,
      text: "Ik ben nieuwsgierig naar hoe mensen elkaar beïnvloeden.",
      scores: { samenleving: 3 },
    },
    {
      id: 11,
      text: "Ik vind thema’s rondom identiteit en diversiteit interessant.",
      scores: { identiteit: 3 },
    },
    {
      id: 12,
      text: "Ik denk graag na over hoe identiteit zich ontwikkelt.",
      scores: { identiteit: 3 },
    },
    {
      id: 13,
      text: "Ik vind het belangrijk om verschillende perspectieven te combineren.",
      scores: { identiteit: 2, moderneMens: 1 },
    },
    {
      id: 14,
      text: "Ik ben geïnteresseerd in de invloed van diversiteit op mentale gezondheid.",
      scores: { identiteit: 3 },
    },
    {
      id: 15,
      text: "Ik werk graag aan creatieve opdrachten zoals een infographic.",
      scores: { identiteit: 2 },
    },
    {
      id: 16,
      text: "Ik vind het interessant hoe technologie ons gedrag beïnvloedt.",
      scores: { moderneMens: 3 },
    },
    {
      id: 17,
      text: "Ik denk graag na over de invloed van sociale media op mentale gezondheid.",
      scores: { moderneMens: 3 },
    },
    {
      id: 18,
      text: "Ik ben geïnteresseerd in actuele ontwikkelingen in de samenleving.",
      scores: { moderneMens: 3 },
    },
    {
      id: 19,
      text: "Ik vind snelle maatschappelijke en technologische veranderingen interessant.",
      scores: { moderneMens: 3 },
    },
    {
      id: 20,
      text: "Ik wil begrijpen hoe mensen omgaan met veel informatie en prikkels.",
      scores: { moderneMens: 2, motivatie: 1 },
    },
    {
      id: 22,
      text: "Ik ben meer geïnteresseerd in persoonlijke ontwikkeling dan in groepsprocessen.",
      scores: { motivatie: 2, identiteit: 1 },
    },
    {
      id: 23,
      text: "Ik werk graag aan opdrachten waarin communicatie centraal staat.",
      scores: { samenleving: 1, identiteit: 2 },
    },
    {
      id: 24,
      text: "Ik ben geïnteresseerd in hoe maatschappelijke factoren gedrag beïnvloeden.",
      scores: { motivatie: 1, samenleving: 2, moderneMens: 2 },
    },
    {
      id: 25,
      text: "Ik vind het interessant om psychologische kennis te koppelen aan hedendaagse maatschappelijke thema’s.",
      scores: { samenleving: 2, moderneMens: 2, identiteit: 1 },
    },
    {
      id: 26,
      text: "Ik heb liever meerdere deeltoetsen dan één groot tentamen.",
      scores: { moderneMens: 3 },
    },
  ];

  const options = [
    { label: "Helemaal oneens", value: -2 },
    { label: "Oneens", value: -1 },
    { label: "Neutraal", value: 0 },
    { label: "Eens", value: 1 },
    { label: "Helemaal eens", value: 2 },
  ];

  const descriptions = {
    motivatie:
      "Motivatie en de zelfsturende mens past goed bij studenten die geïnteresseerd zijn in motivatie, gedragsverandering, zelfsturing en kritisch nadenken over menselijk gedrag.",
    samenleving:
      "Samenleven en de sociale mens past goed bij studenten die geïnteresseerd zijn in sociale interactie, groepsgedrag, maatschappelijke vraagstukken en communicatie.",
    identiteit:
      "Identiteit en de diverse mens past goed bij studenten die geïnteresseerd zijn in identiteit, diversiteit, verschillende perspectieven en maatschappelijke inclusie.",
    moderneMens:
      "21e eeuw en de moderne mens past goed bij studenten die geïnteresseerd zijn in technologie, sociale media, actuele ontwikkelingen en de invloed van de moderne samenleving op gedrag.",
  };

  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleAnswer = (id, value) => {
    setAnswers({ ...answers, [id]: value });
  };

  const calculateResult = () => {
    const totals = {
      motivatie: 0,
      samenleving: 0,
      identiteit: 0,
      moderneMens: 0,
    };

    statements.forEach((statement) => {
      const answer = answers[statement.id] || 0;

      Object.entries(statement.scores).forEach(([vak, weight]) => {
        totals[vak] += answer * weight;
      });
    });

    const bestMatch = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];

    setResult({
      vak: bestMatch[0],
      totals,
    });
  };

  const formatTitle = (key) => {
    const map = {
      motivatie: "Motivatie en de zelfsturende mens",
      samenleving: "Samenleven en de sociale mens",
      identiteit: "Identiteit en de diverse mens",
      moderneMens: "21e eeuw en de moderne mens",
    };

    return map[key];
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold mb-2">
          Keuzewijzer Maatschappelijke Vakken
        </h1>

        <p className="text-slate-600 mb-8">
          Ontdek welk maatschappelijk vak het beste bij jouw interesses en
          manier van werken past.
        </p>

        <div className="space-y-8">
          {statements.map((statement, index) => (
            <div
              key={statement.id}
              className="border border-slate-200 rounded-2xl p-5"
            >
              <p className="font-semibold mb-4">
                {index + 1}. {statement.text}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleAnswer(statement.id, option.value)}
                    className={`p-3 rounded-xl border transition-all font-medium flex items-center justify-center gap-2 ${
                      answers[statement.id] === option.value
                        ? "bg-blue-600 text-white border-blue-600 shadow-lg ring-2 ring-blue-300"
                        : "bg-white hover:bg-slate-50 border-slate-300"
                    }`}
                  >
                    {answers[statement.id] === option.value && (
                      <span className="text-lg">✓</span>
                    )}
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={calculateResult}
            className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:opacity-90"
          >
            Bekijk mijn uitslag
          </button>
        </div>

        {result && (
          <div className="mt-10 bg-slate-50 border border-slate-200 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-4">Jouw beste match</h2>

            <div className="text-2xl font-semibold mb-3">
              {formatTitle(result.vak)}
            </div>

            <p className="text-slate-700 mb-6">
              {descriptions [result.vak]}
            </p>

            <div>
              <h3 className="font-semibold mb-3">Scores per vak</h3>

              <div className="space-y-3">
                {Object.entries(result.totals)
                  .sort((a, b) => b[1] - a[1])
                  .map(([vak, score]) => (
                    <div
                      key={vak}
                      className="bg-white border border-slate-200 rounded-xl p-4"
                    >
                      <span className="font-bold">{formatTitle(vak)} {score}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default function App() {
  const [page, setPage] = useState("intro");
  const [view, setView] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100">
      {page === "intro" && (
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="max-w-3xl bg-white rounded-3xl shadow-xl p-10 text-center">
            <h1 className="text-4xl font-bold mb-6">
              Keuzewijzer tweedejaarsvakken Psychologie
            </h1>

            <p className="text-lg text-slate-700 leading-relaxed mb-8">
              Deze keuzewijzer is gemaakt om je op weg te helpen met het kiezen
              van vakken voor het tweede jaar. Deze keuzewijzer is niet
              allesomvattend en geeft alleen een idee van wat bij je zou kunnen
              passen. Advies is daarom ook om meerdere informatiebronnen te
              gebruiken voor je vakkenkeuze.
            </p>

            <button
              onClick={() => setPage("select")}
              className="bg-slate-900 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:opacity-90"
            >
              Doorgaan
            </button>
          </div>
        </div>
      )}

      {page === "select" && (
        <div className="flex items-center justify-center min-h-screen p-6">
          <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Welke keuzewijzer wil je maken?
            </h1>

            <p className="text-slate-600 mb-10">
              Kies hieronder de categorie die je wilt verkennen.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <button
                onClick={() => {
                  setView("trainingen");
                  setPage("quiz");
                }}
                className="bg-slate-100 hover:bg-slate-200 transition-all rounded-3xl p-10 border border-slate-200"
              >
                <h2 className="text-2xl font-bold mb-3">Trainingen</h2>

                <p className="text-slate-700">
                  Ontdek welke praktische training het beste aansluit bij jouw
                  interesses en manier van werken.
                </p>
              </button>

              <button
                onClick={() => {
                  setView("maatschappelijk");
                  setPage("quiz");
                }}
                className="bg-slate-100 hover:bg-slate-200 transition-all rounded-3xl p-10 border border-slate-200"
              >
                <h2 className="text-2xl font-bold mb-3">
                  Maatschappelijke vakken
                </h2>

                <p className="text-slate-700">
                  Ontdek welk maatschappelijk vak het beste bij jouw interesses
                  en perspectief past.
                </p>
              </button>
            </div>
          </div>
        </div>
      )}

      {page === "quiz" && (
        <div>
          <div className="flex gap-4 justify-center p-6 bg-slate-200">
            <button
              onClick={() => setPage("select")}
              className="px-6 py-3 rounded-2xl font-semibold bg-white"
            >
              Terug
            </button>
          </div>

          {view === "trainingen" ? (
            <TrainingenKeuzewijzer />
          ) : (
            <MaatschappelijkeVakkenKeuzewijzer />
          )}
        </div>
      )}
    </div>
  );
}