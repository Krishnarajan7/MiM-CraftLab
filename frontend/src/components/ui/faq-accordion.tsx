'use client';

import * as React from 'react';
import { HelpCircle, MessageCircle, ChevronDown } from 'lucide-react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';

const CustomAccordion = AccordionPrimitive.Root;

const CustomAccordionItem = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn('border-b border-border', className)}
		{...props}
	/>
));
CustomAccordionItem.displayName = 'CustomAccordionItem';

const CustomAccordionTrigger = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Trigger>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				'flex flex-1 items-center justify-between py-4 text-left font-medium transition-all [&[data-state=open]>div>svg]:rotate-180',
				className
			)}
			{...props}
		>
			<div className="flex items-center gap-3">
				<HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
				<span className="text-foreground">{children}</span>
			</div>
			<div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
				<ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200" />
			</div>
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
CustomAccordionTrigger.displayName = 'CustomAccordionTrigger';

const CustomAccordionContent = React.forwardRef<
	React.ElementRef<typeof AccordionPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cn('pb-4 pt-0 pl-8', className)}>
			<p className="text-muted-foreground leading-relaxed">{children}</p>
			<div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
				<MessageCircle className="h-3 w-3" />
				<span>Was this helpful?</span>
			</div>
		</div>
	</AccordionPrimitive.Content>
));
CustomAccordionContent.displayName = 'CustomAccordionContent';

export {
	CustomAccordion,
	CustomAccordionItem,
	CustomAccordionTrigger,
	CustomAccordionContent,
};

const faqs = [
	{
		question: 'What are your delivery times?',
		answer:
			'Standard UK delivery takes 3-5 working days. Express delivery options are available at checkout for faster shipping.',
	},
	{
		question: 'Do you offer international shipping?',
		answer:
			'Yes, we ship worldwide. International delivery typically takes 7-14 working days depending on your location.',
	},
	{
		question: 'Can I request custom modifications?',
		answer:
			'Absolutely! Visit our Custom Orders page to submit your bespoke project requirements. Our team will review and provide a detailed quote.',
	},
	{
		question: 'What is your returns policy?',
		answer:
			'We offer a 30-day returns policy for unused items in original packaging. Custom orders are non-refundable due to their personalised nature.',
	},
	{
		question: 'What materials do you use?',
		answer:
			'We use premium PLA, PETG, and resin materials depending on the product. All materials are carefully selected for durability and quality.',
	},
];

export function AccordionComponent() {
	return (
		<div className="w-full">
			<div className="bg-card border border-border rounded-2xl p-6 md:p-8">
				<h3 className="text-lg font-semibold text-foreground mb-6">
					Frequently Asked Questions
				</h3>
				<CustomAccordion type="single" collapsible className="w-full">
					{faqs.map((faq, index) => (
						<CustomAccordionItem key={index} value={`item-${index}`}>
							<CustomAccordionTrigger>{faq.question}</CustomAccordionTrigger>
							<CustomAccordionContent>{faq.answer}</CustomAccordionContent>
						</CustomAccordionItem>
					))}
				</CustomAccordion>
			</div>
		</div>
	);
}
