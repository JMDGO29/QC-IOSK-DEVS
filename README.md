#Enhancing Navigation with QC-IOSK: A Projected Capacitive (PCAP) Navigational Kiosk for Quezon City University Campuses

FOR TRANSLATION---------------------------------------------------------------
ASSIGNED: ADAMOS

REQUIREMENTS ON TRANSLATION
STEP 1 CHECK IF THE FILE HAS A IMPORT LIKE THIS:
import { useTranslation } from "react-i18next";
IF IT HAS PROCEED TO STEP2

STEP 2 CHECK IF THE FILE HAS A FUNCTION DECLARATION LIKE THIS:
  const { t } = useTranslation();
IF IT HAS, PROCEED TO STEP 3

STEP 3 
THE FORMAT ON TRANSLATING WOULD BE LIKE THIS 
text={t("Home")}  OR <H1>{t("home")}</H1> = example only
main key item is {t("home")} this alone is all you need to translate every text on kiosk

after that you can now proceed to STEP 4

STEP 4 the translations in this locations:
TAGALOG TRANSLATION LOCATION:
QC-IOSK-DEVS/src/components/locales/tagalog_translation.json
ENGLISH TRANSLATION LOCATION:
QC-IOSK-DEVS/src/components/locales/english_translation.json

STEP 5 
THE TRANSLATION IS IN JSON FORMAT SO IT SHOULD WORK AS 

"JACK CALL": "JACK TAWAG", EQUIVALENT TO 
  {t("JACK CALL")} / THIS IS THE TRANSLATION


TIPS:
YOU MUST DO THE STEP 3 ON A WHOLE FILE THEN CODE THEM 
DOWN IN THE translation FILE

testing testing