import pyautogui as pygui
import time as t
import os

t.sleep(1)

# VEM COMO PARAMETRO

arquivo = "C:/Users/Kayky/OneDrive/Desktop/projeto-agencia-js/src/profiles/kaykyr325.lnk"
link = "https://shopee.com.br"
choice = 'stop'

# FIM


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
    

OpenShopee(arquivo=arquivo, link=link)