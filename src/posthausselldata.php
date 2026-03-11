<?php
header("Access-Control-Allow-Origin: *");
header('Content-Type: application/json');
include_once '../cacheheader.php';
include_once '../config/connection2.php';

$phpJson = json_decode(file_get_contents('php://input'), true);

if ($phpJson === null) {
  echo json_encode(['status' => false, 'msg' => 'Invalid JSON: ' . json_last_error_msg()]);
  exit;
}

// static
$user_id     = $phpJson['user_id'];
$main_cat_id = $phpJson['main_cat_id'];
$subcatid    = $phpJson['subcatid'];
$subsubcatid = $phpJson['subsubcatid'];
$form_type   = $phpJson['form_type'];

// dynamic
$title_name      = $phpJson['title_name'];
$country         = $phpJson['country'];
$zipcode         = $phpJson['pincode'];
$city            = $phpJson['city'];
$state_name      = $phpJson['statename'];
$district        = $phpJson['district'];
$street_address  = $phpJson['street_address'];
$grundflache_val = $phpJson['grundflache'];
$wohnflache_val  = isset($phpJson['wohnflache'])   ? $phpJson['wohnflache']   : "";
$no_of_rooms     = $phpJson['no_of_rooms'];
$zustand_val     = $phpJson['zustand'];
$pricetyp        = isset($phpJson['price_type'])   ? $phpJson['price_type']   : "";
$price           = isset($phpJson['price'])        ? $phpJson['price']        : "";
$objecttyp       = $phpJson['objekttyp'];
$heizung_val     = $phpJson['heizung'];
$baden_val       = $phpJson['boden'];
$ausstatung_val  = $phpJson['ausstattung'];
$bautyp          = isset($phpJson['bautyp'])       ? $phpJson['bautyp']       : "";
$lage            = isset($phpJson['lage'])         ? $phpJson['lage']         : "";
$sonstige        = isset($phpJson['sonstiges'])    ? $phpJson['sonstiges']    : "";
$availability    = $phpJson['availabilitymodalData'];
$description     = $phpJson['Objektbeschreibung'];

$balkon_val       = isset($phpJson['balkonvalue'])       ? $phpJson['balkonvalue']       : "";
$dachterrasse_val = isset($phpJson['dachterrassevalue']) ? $phpJson['dachterrassevalue'] : "";
$garten_val       = isset($phpJson['gartenvalue'])       ? $phpJson['gartenvalue']       : "";
$loggia_val       = isset($phpJson['loggiavalue'])       ? $phpJson['loggiavalue']       : "";
$terrasse_val     = isset($phpJson['terrassevalue'])     ? $phpJson['terrassevalue']     : "";
$wintergarten_val = isset($phpJson['wintergartenvalue']) ? $phpJson['wintergartenvalue'] : "";

$hwb_val      = isset($phpJson['hwb'])          ? $phpJson['hwb']          : "";
$hwb_energie  = isset($phpJson['hwb_energie'])  ? $phpJson['hwb_energie']  : "";
$fgee         = isset($phpJson['fgee'])         ? $phpJson['fgee']         : "";
$fgee_energie = isset($phpJson['fgee_energie']) ? $phpJson['fgee_energie'] : "";

$maklerprovision     = isset($phpJson['maklerprovision'])     ? $phpJson['maklerprovision']     : "";
$ablose_val          = isset($phpJson['ablose'])              ? $phpJson['ablose']              : "";
$wohnbauf_val        = isset($phpJson['wohnbauf_val'])        ? ($phpJson['wohnbauf_val'] ? 'Ja' : 'Nein') : "";
$betriebskosten      = isset($phpJson['betriebskosten'])      ? $phpJson['betriebskosten']      : "";
$betriebskosten_exkl = isset($phpJson['betriebskosten_exkl']) ? $phpJson['betriebskosten_exkl'] : "";
$heizkosten          = isset($phpJson['heizkosten'])          ? $phpJson['heizkosten']          : "";
$sonstige_exkl       = isset($phpJson['sonstige_exkl'])       ? $phpJson['sonstige_exkl']       : "";
$monatliche_inkl     = isset($phpJson['monatliche_inkl'])     ? $phpJson['monatliche_inkl']     : "";
$monatliche_imwst    = isset($phpJson['monatliche_mwst'])     ? $phpJson['monatliche_mwst']     : "";
$zusatzinformation   = isset($phpJson['zusatzinformation'])   ? $phpJson['zusatzinformation']   : "";

$tour_link   = isset($phpJson['tourLink'])    ? $phpJson['tourLink']    : "";
$objekt_info = isset($phpJson['objektInfo'])  ? $phpJson['objektInfo']  : "";
$zustand     = isset($phpJson['ZustandLink']) ? $phpJson['ZustandLink'] : "";
$verkauf     = isset($phpJson['Verkaf'])      ? $phpJson['Verkaf']      : "";

$vonValue = isset($phpJson['vonValue']) ? $phpJson['vonValue'] : "";
$bisValue = isset($phpJson['bisValue']) ? $phpJson['bisValue'] : "";
$vonwoh   = isset($phpJson['vonwoh'])   ? $phpJson['vonwoh']   : "";
$biswoh   = isset($phpJson['biswoh'])   ? $phpJson['biswoh']   : "";

$user_name             = isset($phpJson['user_name'])             ? $phpJson['user_name']             : "";
$nach_name             = isset($phpJson['nachname'])              ? $phpJson['nachname']              : "";
$firmname              = isset($phpJson['firmenname'])            ? $phpJson['firmenname']            : "";
$email                 = isset($phpJson['email'])                 ? $phpJson['email']                 : "";
$weiter_homepage       = isset($phpJson['weitere_homepage'])      ? $phpJson['weitere_homepage']      : "";
$weiter_telefono       = isset($phpJson['weitere_telefono'])      ? $phpJson['weitere_telefono']      : "";
$weiter_telefono_two   = isset($phpJson['weitere_telefono2'])     ? $phpJson['weitere_telefono2']     : "";
$weiterfax             = isset($phpJson['weitere_fax'])           ? $phpJson['weitere_fax']           : "";
$weiter_immocard       = isset($phpJson['weitere_immocard'])      ? $phpJson['weitere_immocard']      : "";
$immocard_firm         = isset($phpJson['immocard_firma'])        ? $phpJson['immocard_firma']        : "";
$zusatzliche_name      = isset($phpJson['zusatzliche_name'])      ? $phpJson['zusatzliche_name']      : "";
$zusatzliche_firmname  = isset($phpJson['zusatzliche_firmname'])  ? $phpJson['zusatzliche_firmname']  : "";
$zusatzliche_homepage  = isset($phpJson['zusatzliche_homepage'])  ? $phpJson['zusatzliche_homepage']  : "";
$zusatzliche_telefono  = isset($phpJson['zusatzliche_telefono'])  ? $phpJson['zusatzliche_telefono']  : "";
$zusatzliche_telefonotwo = isset($phpJson['zusatzliche_telefono2']) ? $phpJson['zusatzliche_telefono2'] : "";
$zusatzliche_fax       = isset($phpJson['zusatzliche_fax'])       ? $phpJson['zusatzliche_fax']       : "";
$zusatzliche_ohenat    = isset($phpJson['zusatzliche_ohenat'])    ? $phpJson['zusatzliche_ohenat']    : "";
$zusatzliche_firmid    = isset($phpJson['zusatzliche_firmid'])    ? $phpJson['zusatzliche_firmid']    : "";
$phone_no              = isset($phpJson['handynumber'])           ? $phpJson['handynumber']           : "";

$company_address = 'webit solution';
$group1          = 1;
$group2          = 2;
$phoneCode1      = '+902';
$savestatus      = '1';
$status          = 2;


  echo json_encode(['status' => false, 'msg' =>$phpJson ]);
  exit;


// get state
$sqlstate = "SELECT states.state_name FROM cities 
             JOIN states ON states.id = cities.state_id 
             WHERE cities.pincode_id = " . intval($zipcode);
$questate  = mysqli_query($conn, $sqlstate);
$statedata = mysqli_fetch_array($questate);
$state     = $state_name ? $state_name : ($statedata['state_name'] ?? '');

$sqlInsert = "INSERT INTO `propertyhausproducts`(
    user_id, main_cat_id, subcatid, subsubcatid, form_type, title_name,
    street_address, country, zipcode, city, pricetyp, price, wohnflache_val,
    grundflache_val, objecttyp, zustand_val, description, lage, sonstige,
    no_of_rooms, availability, bautyp, ausstatung_val, balkon_val,
    dachterrasse_val, garten_val, loggia_val, terrasse_val, wintergarten_val,
    baden_val, heizung_val, hwb_val, hwb_energie, fgee, fgee_energie,
    maklerprovision, ablose_val, wohnbauf_val, betriebskosten,
    betriebskosten_exkl, heizkosten, sonstige_exkl, monatliche_inkl,
    monatliche_imwst, zusatzinformation, tour_link, objekt_info, zustand,
    verkauf, email, firmname, immocard_firm, nach_name, user_name, weiterfax,
    weiter_homepage, weiter_immocard, weiter_telefono, weiter_telefono_second,
    zusatzliche_fax, zusatzliche_firmid, zusatzliche_firmname,
    zusatzliche_homepage, zusatzliche_name, zusatzliche_ohenat,
    zusatzliche_telefono, zusatzliche_telefonotwo, state, phone_no,
    company_address, group1, group2, phonecode1, savestatus, district,
    von, bis, vonwoh, biswoh, status
) VALUES (
    '$user_id','$main_cat_id','$subcatid','$subsubcatid','$form_type','$title_name',
    '$street_address','$country','$zipcode','$city','$pricetyp','$price','$wohnflache_val',
    '$grundflache_val','$objecttyp','$zustand_val','$description','$lage',
    '$sonstige','$no_of_rooms','$availability','$bautyp','$ausstatung_val','$balkon_val',
    '$dachterrasse_val','$garten_val','$loggia_val','$terrasse_val','$wintergarten_val',
    '$baden_val','$heizung_val','$hwb_val','$hwb_energie','$fgee','$fgee_energie',
    '$maklerprovision','$ablose_val','$wohnbauf_val','$betriebskosten','$betriebskosten_exkl',
    '$heizkosten','$sonstige_exkl','$monatliche_inkl','$monatliche_imwst','$zusatzinformation',
    '$tour_link','$objekt_info','$zustand','$verkauf','$email','$firmname','$immocard_firm',
    '$nach_name','$user_name','$weiterfax','$weiter_homepage','$weiter_immocard',
    '$weiter_telefono','$weiter_telefono_two','$zusatzliche_fax','$zusatzliche_firmid',
    '$zusatzliche_firmname','$zusatzliche_homepage','$zusatzliche_name','$zusatzliche_ohenat',
    '$zusatzliche_telefono','$zusatzliche_telefonotwo','$state','$phone_no','$company_address',
    '$group1','$group2','$phoneCode1','$savestatus','$district','$vonValue','$bisValue',
    '$vonwoh','$biswoh','$status'
)";

// ← fix: default $editId before the if block
$editId  = 0;
$success = false;
$message = "";

if (mysqli_query($conn, $sqlInsert) == TRUE) {
  $editId  = mysqli_insert_id($conn);
  $message = "Insert Successfully.";
  $success = true;
  http_response_code(200);
} else {
  $message = "Unable to Insert: " . mysqli_error($conn); // ← shows exact DB error
  $success = false;
  http_response_code(202);
}

echo json_encode(['status' => $success, 'msg' => $message, 'id' => $editId]);
?>