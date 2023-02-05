# import re
# import requests
# from bs4 import BeautifulSoup

# def scrape_emails_and_phone_numbers(sites_to_scrape):
#     data = {'phone': [], 'site': [], 'email': []}
#     for site in sites_to_scrape:
#         try:
#             page = requests.get(site)
#             soup = BeautifulSoup(page.content, 'html.parser')
#             emails = re.findall(r'[\w\.-]+@[\w\.-]+', soup.get_text())
#             phones = re.findall(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', soup.get_text())
#             data['site'].append(site)
#             data['email'].append(emails)
#             data['phone'].append(phones)
#         except:
#             pass
#     return data

# #initialize the bot
# sites = ["https://www.example1.com", "https://www.example2.com", "https://www.example3.com"]
# print(scrape_emails_and_phone_numbers(sites))





# import re
# import requests
# from bs4 import BeautifulSoup
# from requests_proxy.exceptions import ProxyError
# from requests_proxy.models import Proxy, ProxyPool

# def scrape_emails_and_phone_numbers(sites_to_scrape):
#     data = {'phone': [], 'site': [], 'email': []}
#     proxy_pool = ProxyPool(proxy_list=['http://proxy-ip-1:port', 'http://proxy-ip-2:port', ...], max_failures=3)
#     for site in sites_to_scrape:
#         try:
#             proxy = proxy_pool.get_proxy()
#             page = requests.get(site, proxies=proxy.get_dict())
#             soup = BeautifulSoup(page.content, 'html.parser')
#             emails = re.findall(r'[\w\.-]+@[\w\.-]+', soup.get_text())
#             phones = re.findall(
#             soup = BeautifulSoup(page.content, 'html.parser')
#             emails = re.findall(r'[\w\.-]+@[\w\.-]+', soup.get_text())
#             phones = re.findall(r'\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', soup.get_text())
#             data['site'].append(site)
#             data['email'].append(emails)
#             data['phone'].append(phones)
#             proxy_pool.mark_proxy_as_working(proxy)
#         except:
#             proxy_pool.mark_proxy_as_failed(proxy)
#     return data
