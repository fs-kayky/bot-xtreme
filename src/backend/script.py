import pyautogui as pygui
import time as t
import os
import json
import sys

t.sleep(1)

# VEM COMO PARAMETRO

# arquivo = "C:/Users/Kayky/OneDrive/Desktop/projeto-agencia-js/src/profiles/kaykyr325.lnk"
# link = "https://shopee.com.br"
# choice = 'stop'

# FIM

profile_name = "perfil-kayky"
profile_json = "src\\profiles\\profiles.JSON"
profile_settings = None
    
with open(profile_json, 'r') as json_archive:
    data_json = json.load(json_archive)

for object in data_json:
    actual_name = object.get('name')
    if actual_name == profile_name:
        profile_settings = object 
    break
    
profile_url = profile_settings['arquivo']
ad_link = profile_settings['link']
choice = profile_settings['choice']



def StopOrPauseAd(choice):
    if choice == 'pause':
        pygui.click(x=1665, y= 369)
        print('pause')
    elif choice == 'stop':
        pygui.click(x=1770, y=376)
        print('stop')


def OpenShopee(arquivo, link):
    try:
        os.startfile(arquivo)
        t.sleep(1)
        pygui.write(link)
        pygui.press('return')
        pygui.press('f11')
        t.sleep(2)
        StopOrPauseAd(choice=choice)
    except FileNotFoundError as Error :
        print('Nao foi possivel achar o caminho do arquivo!')
    finally:
        return 'Processo Concluido!'

OpenShopee(arquivo=profile_url, link=ad_link)