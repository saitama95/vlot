import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Commonservices {
  
   zustandOtp = [
    { name : 'Erstbezug'},
    { name : 'Sehr gut/Gut'},
    { name : 'Neuwertig'},
    { name : 'Renoviert'},
    { name : 'Sanierungsbedürftig'},
  ];

  getcountryData = [{
    country_name : 'Österreich'
  }];

  Preistyp = [
    {name : 'Fixpreis',},
    {name : 'Verhandelbar'},
    {name : 'Auf Anfrage'},
    // {name : 'Zu verschenken'}
  ];

  ausstattungList  = [
    {name: "Abstellraum"},
    {name: "Barrierefrei"},
    {name: "Carport"},
    {name: "Einbauküche"},
    {name: "Fahrstuhl"},
    {name: "Garage"},
    {name: "Keller"},
    {name: "Parkplatz"},
    {name: "Teilmöbliert / Möbliert"},
 ];

  BodenData = [ 
    {name : 'Fliesen'},
    {name : 'Holz'},
    {name : 'Laminat'},
    {name : 'Marmor'},
    {name : 'Naturstein'},
    {name : 'Parkett'},
    {name : 'Teppich'},
    {name : 'Sonstige'},
  ] 

  HeizungData= [
    {name : 'Biomasse'},
    {name : 'Elektroheizung'},
    {name : 'Erdwärme'},
    {name : 'Etagenheizung'},
    {name : 'Fernwärme'},
    {name : 'Fußbodenheizung'},
    {name : 'Gasheizung'},
    {name : 'Hackschnitzelheizung'},
    {name : 'Hauszentralheizung'},
    {name : 'Luftwärmepumpe'},
    {name : 'Ölheizung'},
    {name : 'Pellets'},
    {name : 'Solar'},
    {name : 'Zentralheizung'},
    {name : 'Sonstige'}, 
    {name : 'Kontrollierte Wohnraumlüftung'},
  ];

  BautypData = [
    {'name' : 'Altbau', "id" : 1},
    {'name' : 'Neubau', "id" : 2}
  ];

   objecttypedata = [
    {
    "id" : 1,
    "name" : 'Almhütte/Berghütte'
    },
    {
      "id" : 2,
      "name" : 'Bauernhaus'
    },
    {
      "id" : 3,
      "name" : 'Bungalow'
    },
    {
      "id" : 4,
      "name" : 'Doppelhaushälfte'
    },
    {
      "id" : 5,
      "name" : 'Einfamilienhaus'
    },
    {
      "id" : 6,
      "name" : 'Gartenhaus'
    },
    {
      "id" : 7,
      "name" : 'Genossenschaftshaus'
    },
    {
      "id" : 8,
      "name" : 'Landhaus'
    },
    {
      "id" : 10,
      "name" : 'Mehrfamilienhaus'
    },
    {
      "id" : 11,
      "name" : 'Reihenhaus'
    },
    {
      "id" : 12,
      "name" : 'Rohbau'
    },
    {
      "id" : 13,
      "name" : 'Schloss/Burg/Chalet'
    },
    {
      "id" : 14,
      "name" : 'Villa'
    },
    {
      "id" : 15,
      "name" : 'Sonstige'
    }
    
];
}
