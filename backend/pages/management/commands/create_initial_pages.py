from django.core.management.base import BaseCommand
from pages.models import Page

class Command(BaseCommand):
    help = 'Creates the initial 10 pages for the application'

    def handle(self, *args, **options):
        PAGES = [
            'Products List',
            'Marketing List',
            'Order List',
            'Media Plans',
            'Offer Pricing SKUs',
            'Clients',
            'Suppliers',
            'Customer Support',
            'Sales Reports',
            'Finance & Accounting'
        ]
        
        created_count = 0
        for page_name in PAGES:
            _, created = Page.objects.get_or_create(
                name=page_name,
                defaults={'slug': page_name.lower().replace(' ', '-')}
            )
            if created:
                created_count += 1
        
        self.stdout.write(self.style.SUCCESS(f'Successfully created {created_count} pages'))