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
}
