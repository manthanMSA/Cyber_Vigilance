from hackmageddon.items import HackmageddonItem
from scrapy import Spider, Request

from scrapy.exceptions import CloseSpider
import re



class HackmageddonSpider(Spider):
    name = "hackmageddon"
    allowed_urls = ["http://www.hackmageddon.com/"]
    # start_urls = ["https://www.hackmageddon.com/2011/08/02/july-2011-cyber-attacks-timeline/"]
    start_urls = ["https://www.hackmageddon.com/2021/01/25/1-15-january-2021-cyber-attacks-timeline/"]

    
    def parse(self,response,i=[0]):
        
        urls = response.xpath('//a/@href').extract()

        # Check for the target URL
        if "https://www.hackmageddon.com/2022/01/26/1-15-january-2022-cyber-attacks-timeline/" in urls:
            raise CloseSpider("Reached target URL. Stopping crawl.")
    
        i[0] += 1
        if i[0] != 1:
            if (re.findall('^(?!.*{}).*{}.*$'.format('statistics','\d+-\d+-\w+-\d+'),response.meta['link']) == []):
                link = response.xpath('//a[@rel="next"]/@href').extract_first()
                yield Request(link, callback= self.parse,meta={'link': link})
            elif (re.findall('^(?!.*{}).*{}.*$'.format('statistics','\d+-\d+-\w+'),response.meta['link']) == []):
                link = response.xpath('//a[@rel="next"]/@href').extract_first()
                yield Request(link, callback= self.parse,meta={'link': link})

        
        rows = response.xpath('//tbody[@class="row-hover"]//tr')
        if not rows:
            rows = response.xpath('//tbody/tr')	
    
        for row in rows:
            year = response.xpath('//a[@rel="tag"]/text()').extract()[0]
            date = row.xpath('./td[2]/text()').extract()
            if date:
                date_parts = date[0].split('/')
                # Extract the year (last element)
                year = date_parts[-1]


            author = row.xpath('./td[5]/text()').extract()
            target = row.xpath('./td[6]/text()').extract()
            description = row.xpath('./td[7]/text()').extract()
            if not description:
                description = row.xpath('./td[5]/a/text()').extract()
            attack = row.xpath('./td[8]/text()').extract()
            target_class = row.xpath('./td[9]/text()').extract()
            attack_class = row.xpath('./td[10]/text()').extract()
            country = row.xpath('./td[11]/text()').extract()

            item = HackmageddonItem()
            item['Year'] = year
            item['dat'] = date
            item['Author'] = author
            item['Target'] = target
            item['Description'] = description
            item['Attack'] = attack
            item['Target_class'] = target_class
            item['Attack_class'] = attack_class
            item['Country'] = country
            yield item	

        if True:	
            link = response.xpath('//a[@rel="next"]/@href').extract_first()
            yield Request(link,callback=self.parse,meta={'link': link})
