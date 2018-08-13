const ZIP_CODES_WE_DELIVER_TO = [
  '50001', // Ackworth
  '50003', // Adel
  '50007', // Alleman
  '50009', // Altoona
  '50021', // Ankeny
  '50023', // Ankeny
  '50026', // Bagley
  '50029', // Bayard
  '50032', // Berwick
  '50033', // Bevington
  '50035', // Bondurant
  '50038', // Booneville
  '50039', // Bouton
  '50047', // Carlisle
  '50048', // Casey
  '50061', // Cumming
  '50063', // Dallas Center
  '50066', // Dawson
  '50069', // De Soto
  '50070', // Dexter
  '50072', // Earlham
  '50073', // Elkhart
  '50109', // Granger
  '50111', // Grimes
  '50115', // Guthrie Center
  '50118', // Hartford
  '50125', // Indianola
  '50128', // Jamaica
  '50131', // Johnston
  '50139', // Lacona
  '50146', // Linden
  '50155', // Macksburg
  '50160', // Martensdale
  '50164', // Menlo
  '50166', // Milo
  '50167', // Minburn
  '50169', // Mitchellville
  '50210', // New Virginia
  '50211', // Norwalk
  '50216', // Lake Panorama
  '50218', // Patterson
  '50220', // Perry
  '50222', // Peru
  '50226', // Polk City
  '50229', // Prole
  '50233', // Redfield
  '50237', // Runnells
  '50240', // Saint Charles
  '50243', // Sheldahl
  '50250', // Stuart
  '50257', // Truro
  '50261', // Van Meter
  '50263', // Waukee
  '50265', // West Des Moines
  '50266', // West Des Moines
  '50273', // Winterset
  '50276', // Woodward
  '50277', // Yale
  '50309', // Des Moines
  '50310', // Des Moines
  '50311', // Des Moines
  '50312', // Des Moines
  '50313', // Des Moines
  '50314', // Des Moines
  '50315', // Des Moines
  '50316', // Des Moines
  '50317', // Des Moines
  '50319', // State Of Iowa
  '50320', // Des Moines
  '50321', // Des Moines
  '50322', // Urbandale
  '50323', // Urbandale
  '50324', // Windsor Heights
  '50325', // Clive
  '50327', // Pleasant Hill
];

const canDeliverToZipCode = zipCode =>
  ZIP_CODES_WE_DELIVER_TO.includes(zipCode);

module.exports = {
  canDeliverToZipCode,
};
