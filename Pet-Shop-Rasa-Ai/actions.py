from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.events import SlotSet

class ActionGetPetType(Action):
    def name(self) -> Text:
        return "action_get_pet_type"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        pet_type = tracker.get_slot("pet_type")
        if pet_type:
            pet_type = pet_type.lower()
            if pet_type == "fish":
                dispatcher.utter_message(text="We have Goldfish ($15) and Koi Fish ($50) available.")
            elif pet_type == "birds":
                dispatcher.utter_message(text="We have Ara Parrot ($1050) and Canary ($40) available.")
            elif pet_type == "dogs":
                dispatcher.utter_message(text="We have Labrador Retriever ($600) and Scottish Collie ($700) available.")
            elif pet_type == "cats":
                dispatcher.utter_message(text="We have Persian Cat ($400) available.")
            elif pet_type == "exotic pets":
                dispatcher.utter_message(text="We have African Hedgehog ($125) and Greek Tortoise ($400) available.")
            elif pet_type == "rodents":
                dispatcher.utter_message(text="We have Mini Rex Rabbit ($75) available.")
            else:
                dispatcher.utter_message(text="I'm not sure about that type of pet. We have Fish, Birds, Dogs, Cats, Exotic pets, and Rodents available.")
        else:
            dispatcher.utter_message(text="We have several types of pets available:\n- Fish (Goldfish, Koi Fish)\n- Birds (Ara Parrot, Canary)\n- Dogs (Labrador Retriever, Scottish Collie)\n- Cats (Persian Cat)\n- Exotic pets (African Hedgehog, Greek Tortoise)\n- Rodents (Mini Rex Rabbit)\nWhat type are you interested in?")
        
        return []

class ActionGetPetPrice(Action):
    def name(self) -> Text:
        return "action_get_pet_price"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        pet_name = tracker.get_slot("pet_name")
        if pet_name:
            pet_name = pet_name.lower()
            prices = {
                "goldfish": 15,
                "ara parrot": 1050,
                "labrador retriever": 600,
                "persian cat": 400,
                "african hedgehog": 125,
                "koi fish": 50,
                "scottish collie": 700,
                "canary": 40,
                "mini rex rabbit": 75,
                "greek tortoise": 400
            }
            
            if pet_name in prices:
                dispatcher.utter_message(text=f"The {pet_name.title()} costs ${prices[pet_name]}. Would you like to know more about it?")
            else:
                dispatcher.utter_message(text=f"I'm sorry, I don't have information about {pet_name}. Could you please specify which pet you're interested in?")
        else:
            dispatcher.utter_message(text="I'm not sure which pet you're asking about. Could you please specify the name of the pet?")
        
        return []

class ActionGetPetDetails(Action):
    def name(self) -> Text:
        return "action_get_pet_details"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        pet_name = tracker.get_slot("pet_name")
        if pet_name:
            pet_name = pet_name.lower()
            details = {
                "goldfish": {"type": "Fish", "size": "Small (up to 15 cm)", "manufacturer": "Asia", "price": 15},
                "ara parrot": {"type": "Birds", "size": "Large (around 90 cm with tail)", "manufacturer": "South Africa", "price": 1050},
                "labrador retriever": {"type": "Dogs", "size": "Medium (30kg)", "manufacturer": "Canada", "price": 600},
                "persian cat": {"type": "Cats", "size": "Medium (5kg)", "manufacturer": "Iran", "price": 400},
                "african hedgehog": {"type": "Exotic pets", "size": "Small (15cm)", "manufacturer": "Africa", "price": 125},
                "koi fish": {"type": "Fish", "size": "Large (40cm)", "manufacturer": "Japan", "price": 50},
                "scottish collie": {"type": "Dogs", "size": "Large (25cm)", "manufacturer": "Scotland", "price": 700},
                "canary": {"type": "Birds", "size": "Small (10cm)", "manufacturer": "Canary Islands", "price": 40},
                "mini rex rabbit": {"type": "Rodents", "size": "Small (2kg)", "manufacturer": "USA", "price": 75},
                "greek tortoise": {"type": "Exotic pets", "size": "Small (30cm)", "manufacturer": "Mediterranean", "price": 400}
            }
            
            if pet_name in details:
                pet = details[pet_name]
                dispatcher.utter_message(
                    text=f"The {pet_name.title()} is a {pet['type']} from {pet['manufacturer']}. "
                    f"It's {pet['size']} and costs ${pet['price']}. Would you like to know more?"
                )
            else:
                dispatcher.utter_message(text=f"I'm sorry, I don't have detailed information about {pet_name}. Could you please specify which pet you're interested in?")
        else:
            dispatcher.utter_message(text="I'm not sure which pet you're asking about. Could you please specify the name of the pet?")
        
        return [] 