import subprocess
import sqlite3
import json
from selenium.webdriver.common.by import By
from twilio.rest import Client
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium import webdriver
import requests
import random
from fake_useragent import UserAgent
import string


def generate_device_id(write=false):
    # Define the length of the device ID
    id_length = 16

    # Generate a random device ID
    device_id = ''.join(random.choices(
        string.ascii_uppercase + string.digits, k=id_length))

    # Write the device ID to a file
    if (write):
        with open('device_id.txt', 'w') as f:
            f.write(device_id)

    return device_id


# Use a random user-agent to hide the browser type and version
ua = UserAgent()
headers = {'User-Agent': ua.random}

# Use a proxy to hide the IP address
proxies = {'http': 'http://127.0.0.1:8080', 'https': 'http://127.0.0.1:8080'}

# Send a request to a website
response = requests.get('http://example.com', headers=headers, proxies=proxies)


testBot = {}


def get_free_proxy():
    # Scrape the website that lists free residential proxies
    response = requests.get("https://free-proxy-list.net/")

    # Parse the HTML content of the website
    proxies = response.text.split("\n")

    # Extract the IP address and port of the first proxy in the list
    ip, port = proxies[0].split(":")

    return (ip, port)


def get_local_db(db_file):
    conn = sqlite3.connect(db_file)
    return dbo


def getVpn():
    # Start openvpn client with the proper config file
    subprocess.run(["openvpn", "--config", "path/to/config.ovpn"])


def spoof_device_id(driver):
    device_id = ''.join(random.choices(
        string.ascii_letters + string.digits, k=20))
    driver.add_cookie({'name': 'device_id', 'value': device_id})


def clear_cookies(driver):
    driver.delete_all_cookies()


def clear_browser_history(driver):
    driver.execute_script("window.localStorage.clear();")
    driver.execute_script("window.sessionStorage.clear();")
    driver.execute_script("window.indexedDB.deleteDatabase('History');")
    driver.execute_script("window.indexedDB.deleteDatabase('Downloads');")
    driver.execute_script(
        "window.indexedDB.deleteDatabase('chrome-extension_dckljplncjfjbkofonabajfhbomjffjp_0');")


def use_browser_extensions(driver):
    # Code to add browser extensions


def use_vpn(driver):
    proxy = get_free_proxy()
    # Code to use a VPN
    driver.add_argument("--proxy-server=socks5://127.0.0.1:1080")


def create_driver():
    chrome_options = Options()
    options_list = [
        "--headless",
        "--disable-extensions",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--remote-debugging-port=9222",
        "--disable-features=VizDisplayCompositor",
        "--disable-web-security",
        "--disable-site-isolation-trials",
        "--disable-popup-blocking",
        "--disable-infobars",
        "--disable-dev-shm-usage",
        "--disable-prompt-on-repost",
        "--disable-sync",
        "--disable-background-networking",
        "--disable-default-apps",
        "--disable-component-extensions-with-background-pages",
        "--disable-background-timer-throttling",
        "--disable-backgrounding-occluded-windows",
        "--disable-renderer-backgrounding",
        "--disable-accelerated-2d-canvas",
        "--disable-accelerated-jpeg-decoding",
        "--disable-accelerated-video-decode",
        "--disable-accelerated-video-encode",
        "--disable-app-list-dismiss-on-blur",
        "--disable-breakpad",
        "--disable-cast",
        "--disable-cloud-import",
        "--disable-component-update",
        "--disable-crash-reporter",
        "--disable-datasaver-prompt",
        "--disable-demo-mode",
        "--disable-domain-reliability",
        "--disable-extensions-except",
        "--disable-features=IsolateOrigins,site-per-process",
        "--disable-hang-monitor",
        "--disable-ipc-flooding-protection",
        "--disable-popup-blocking",
        "--disable-prompt-on-repost",
        "--disable-renderer-backgrounding",
        "--disable-speech-api",
        "--disable-sync",
        "--disable-tab-for-desktop-share",
        "--disable-tab-switcher",
        "--disable-translate",
        "--disable-voice-input",
        "--disable-web-resources",
        "--disable-web-security",
        "--disable-webrtc-multiple-routes",
        "--disable-zero-browsers-open-for-tests",
        "--disable-client-side-phishing-detection",
        "--disable-extensions",
        "--disable-features=TranslateUI",
        "--disable-infobars",
        "--disable-notifications",
        "--disable-offer-store-unmasked-wallet-cards",
        "--disable-offer-upload-credit-cards",
        "--disable-popup-blocking",
        "--disable-print-preview",
        "--disable-prompt-on-repost",
        "--disable-setuid-sandbox",
        "--disable-sync",
        "--enable-logging",
        "--enable-smooth-scrolling",
        "--enable-tcp-fast-open",
        "--hide-scrollbars",
        "--ignore-certificate-errors",
        "--load-extension",
        "--metrics-recording-only",
        "--no-pings",
        "--no-sandbox",
        "--remote-debugging-address",
        "--remote-debugging-port",
        "--safebrowsing-disable-auto-update",
        "--safebrowsing-disable-extension-blacklist",
        "--safebrowsing-disable-safe-browsing",
        "--safebrowsing-disable-threat-blocking",
        "--safebrowsing-disable-threat-detection",
        "--safebrowsing-disable-v4-only",
        "--safebrowsing-disable-v4-only-mode",
        "--safebrowsing-disable-v4-only-mode-extension-blacklist",
        "--safebrowsing-disable-v4-only-mode-threat-blocking",
        "--safebrowsing-disable-v4-only-mode-threat-detection",
        "--safebrowsing-disable-v4-only-mode-threat-field-trial",
        "--safebrowsing-disable-v4-only-mode-threat-lists",
        "--safebrowsing-disable-v4-only-mode-threat-protection-service",
        "--safebrowsing-disable-v4-only-mode-threat-protection-service-extension-blacklist",
        "--safebrowsing-disable-v4-only-mode-threat-protection-service-threat-blocking",
        "--disable-client-side-phishing-detection",
        "--disable-component-update",
        "--disable-default-browser-checking",
        "--disable-domain-reliability",
        "--disable-extensions-file-access-check",
        "--disable-hang-monitor",
        "--disable-prompt-on-repost",
        "--disable-sync",
        "--disable-translate",
        "--disable-web-resources",
        "--disable-cloud-import",
        "--disable-web-security",
        "--disable-webrtc-multiple-routes",
        "--disable-zero-browsers-open-for-tests",
        "--disable-client-side-phishing-detection",
        "--disable-default-apps",
        "--disable-dev-shm-usage",
        "--disable-extensions",
        "--disable-offer-store-unmasked-wallet-cards",
        "--disable-offer-upload-credit-cards",
        "--disable-print-preview",
        "--enable-logging",
        "--enable-precise-memory-info",
        "--enable-smooth-scrolling",
        "--enable-tcp-fast-open",
        "--enable-webgl",
        "--ignore-certificate-errors",
        "--ignore-ssl-errors",
        "--load-extension",
        "--no-first-run",
        "--no-pings",
        "--no-startup-window",
        "--safebrowsing-disable-download-protection",
        "--safebrowsing-disable-ip-blacklist",
        "--safebrowsing-disable-local-blacklist",
        "--safebrowsing-disable-local-phishing-detection",
        "--safebrowsing-disable-remote-blacklist",
        "--safebrowsing-disable-threat-lists",
        "--safebrowsing-disable-v4-only-mode-threat-protection-service-threat-detection",
        "--incognito"
    ]

    for option in options_list:
        chrome_options.add_argument(option)

    driver = webdriver.Chrome(chrome_options=chrome_options)

    driver = getDriver()
    spoof_device_id(driver)
    clear_cookies(driver)
    clear_browser_history(driver)
    # use_browser_extensions(driver)
    use_vpn(driver)

    return driver

# def use_unique_credentials(driver):
    # Code to use unique username and password for each website or app

# def avoid_personal_info(driver):
    # Code to avoid providing personal information


def configure_bot(json_str, dbo):
    json_obj = json.loads(json_str)
    driver = create_driver()
    for action in json_obj:
        if 'actions' in action:
            for sub_action in action['actions']:
                execute_action(driver, sub_action, dbo)
        if 'args' in action:
            args = action['args']
            for arg in args:
                if arg['type'] == 'create':
                    create_data(arg['data'])
                elif arg['type'] == 'read':
                    read_data(arg['data'])
                elif arg['type'] == 'update':
                    update_data(arg['data'])
                elif arg['type'] == 'delete':
                    delete_data(arg['data'])
        execute_action(driver, action, dbo)
    return driver


def execute_action(driver, action):
    if action['action'] == 'get':
        driver.get(action['args'])
    elif action['action'] == 'find_element':
        if 'xpath' in action:
            element = driver.find_element(By.XPATH, action['xpath'])
        elif 'css' in action:
            element = driver.find_element(By.CSS_SELECTOR, action['css'])
    elif action['action'] == 'click':
        element.click()
    elif action['action'] == 'send_keys':
        element.send_keys(action['args'])
    elif action['action'] == 'clear':
        element.clear()
    elif action['action'] == 'submit':
        element.submit()
    elif action['action'] == 'find_elements':
        if 'xpath' in action:
            elements = driver.find_elements(By.XPATH, action['xpath'])
        elif 'css' in action:
            elements = driver.find_elements(By.CSS_SELECTOR, action['css'])
    elif action['action'] == 'get_attribute':
        value = element.get_attribute(action['args'])
    elif action['action'] == 'is_displayed':
        value = element.is_displayed()
    elif action['action'] == 'is_enabled':
        value = element.is_enabled()
    elif action['action'] == 'is_selected':
        value = element.is_selected()
    elif action['action'] == 'text':
        value = element.text
    elif action['action'] == 'location':
        value = element.location
    elif action['action'] == 'size':
        value = element.size
    elif action['action'] == 'screenshot':
        element.screenshot(action['args'])
    elif action['action'] == 'execute_script':
        driver.execute_script(action['args'])
    elif action['action'] == 'switch_to_frame':
        driver.switch_to.frame(element)
    elif action['action'] == 'switch_to_window':
        driver.switch_to.window(action['args'])
    elif action['action'] == 'switch_to_default_content':
        driver.switch_to.default_content()
    # Add more elif statements for other Selenium actions as needed


def create_data(data, dbo):
    cursor = dbo.cursor()
    cursor.execute("INSERT INTO tablename (col1, col2, col3) VALUES (?, ?, ?)",
                   (data['col1'], data['col2'], data['col3']))
    dbo.commit()


def read_data(data, dbo):
    cursor = dbo.cursor()
    cursor.execute("SELECT * FROM tablename WHERE id = ?", (data['id'],))
    return cursor.fetchone()


def update_data(data, dbo):
    cursor = dbo.cursor()
    cursor.execute("UPDATE tablename SET col1 = ?, col2 = ?, col3 = ? WHERE id = ?",
                   (data['col1'], data['col2'], data['col3'], data['id']))
    dbo.commit()


def delete_data(data, dbo):
    cursor = dbo.cursor()
    cursor.execute("DELETE FROM tablename WHERE id = ?", (data['id'],))
    dbo.commit()


def upload_file(file_path):
    # initialize webdriver
    driver = webdriver.Chrome()

    # navigate to your website
    driver.get("https://yourwebsite.com")

    # wait for file upload button to be visible
    upload_button = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "file-upload-button"))
    )

    # click file upload button
    upload_button.click()

    # wait for file input to be visible
    file_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "file-input"))
    )

    # set the file path
    file_input.send_keys(file_path)

    # submit the form
    driver.find_element_by_id("submit-button").click()

    # close the browser
    driver.quit()

# Example usage:
# upload_file("/path/to/file.jpg")


def login():
    # Start a webdriver session
    driver = webdriver.Chrome()

    # Navigate to the website
    driver.get("https://example.com/login")

    # Find the login button and click it
    login_button = driver.find_element_by_id("login-button")
    login_button.click()

    # Find the login with phone number button and click it
    login_phone_button = driver.find_element_by_id("login-phone-button")
    login_phone_button.click()


def getPhoneNumber():
    # Your Account Sid and Auth Token from twilio.com/console
    account_sid = 'your_account_sid'
    auth_token = 'your_auth_token'
    client = Client(account_sid, auth_token)

    # Create a new phone number
    phone_number = client.incoming_phone_numbers.create(
        phone_number="15005550000"
    )

    # Retrieve all messages sent to the phone number
    messages = client.messages.list(to=phone_number.phone_number)

    for message in messages:
        print(message.body)
