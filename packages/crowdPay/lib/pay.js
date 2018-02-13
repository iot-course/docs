/**
* Receives an email to pay dev for successful pull request
 * @summary λ statuses ⇒ λ pay ⇒ paypal
*/

exports.handler = ({ email}, _, cb) => {
  console.log(email,'-----event')
  cb(null, e)
}


/*


Search on Unix & Linux…

Log In Sign Up

Unix & Linux
 questions

 tags

 users

 badges

 unanswered

ask question
_ Unix & Linux Stack Exchange is a question and answer site for users of Linux, FreeBSD and other Un*x-like operating systems. Join them; it only takes a minute:

Sign up
Here's how it works:
Anybody can ask a question  Anybody can answer  The best answers are voted up and rise to the top
Hide curl output
up vote
105
down vote
favorite
11
I'm making a curl request where it displays an html output in the console like this

<b>Warning</b>:  Cannot modify header information - headers already sent by (output started at /home/domain/public_html/wp-content/themes/explicit/functions/ajax.php:87) in <b>/home/domain/public_html/wp-content/themes/explicit/functions/ajax.php</b> on line <b>149</b><br />......
etc

I need to hide these outputs when running the CURL requests, tried running the CURL like this

curl -s 'http://example.com'
But it still displays the output, how can I hide the output?

Thanks

curl
shareimprove this question
edited Apr 19 '17 at 20:17

ivanleoncz
17310
asked Apr 16 '15 at 9:16

Rjack
528244
Append >/dev/null at the end. Read more about File Descriptors on mywiki.wooledge.org/FileDescriptor?highlight=%28FD%29 – val0x00ff Apr 16 '15 at 9:19
add a comment
2 Answers
active oldest votes
up vote
164
down vote
accepted
From man curl

-s, --silent Silent or quiet mode. Don't show progress meter or error messages. Makes Curl mute. It will still output the data you ask for, potentially even to the terminal/stdout unless you redirect it.

So if you don't want any output use:

curl -s 'http://example.com' > /dev/null
shareimprove this answer
answered Apr 16 '15 at 9:20

FloHimself
4,86421016
7
If you want only errors add the -S flag curl -s -S 'example.com'; > /dev/null – Gonzalo Cao Nov 3 '16 at 11:55
Note that you can't do curl -o /dev/null; it will throw a write error. – Keith Tyler Feb 10 '17 at 22:12
But you can do curl ... 2>/dev/null to redirect stderr only. – Jesse Chisholm Sep 14 '17 at 20:23
add a comment
up vote
19
down vote
This one looks more elegant to me:

curl --silent --output /dev/null http://example.com
Also, if you want to see the HTTP code:

curl --write-out '%{http_code}' --silent --output /dev/null http://example.com
Full documentation is here.

shareimprove this answer
answered May 3 '17 at 5:46

yegor256
4481612
add a comment
Your Answer


Sign up or log in
 Sign up using Google
 Sign up using Facebook
 Sign up using Email and Password

Post as a guest
Name

Email

required, but never shown
By posting your answer, you agree to the privacy policy and terms of service.

Not the answer you're looking for? Browse other questions tagged curl or ask your own question.
asked

2 years, 10 months ago

viewed

126,367 times

active

9 months ago

We have 15 open jobs ♥Apple
Apple

Austin, TX

Consumer ElectronicsPublic10k+ people
Our tech stack

javascriptnode.jsjavareactjspythoniosmacosjsonlinuxruby-on-railsbashswiftc++nosqlunixobjective-cmobilecperlmachine-learningnlptvosdata-sciencerustcocoaember.js
We offer great benefits

 Special Pricing on Apple Products
 Family Time-Away Programs
 Stock Grants and Discounts
 Onsite Fitness and Wellness Centers (vary by location)
Learn more
Linked
5
Hide ouput of bash while running automated script.
Related
3
Source (.) piped curl output
1
pipe curl colored output
0
curl command output in a variable
41
How to grep the output of cURL?
1
Copy output of curl to file
0
How do I pipe the output of a curl command to an environment variable and use it in another curl command?
1
Log Curl Output
-2
CuRL command is not giving output as Url is not responding
0
Convert cURL multi-line output to single, semi-colon-separated line
0
Grep cURL output
Hot Network Questions
Is it okay to ask a senior academic a question that my advisor is unable to answer?
Investment strategy for Google: What did I do wrong?
What do you call a _________ of cloth?
In Pokemon, is base damage done to multiple targets the same?
How to tell plumber their service isn’t needed any more?
Can Polymorph turn a character into a dragon?
Is there still a reason to use `int` in C++ code?
What exactly is svabhava?
How do I have to refer to a person of a specific racial group?
How would people conceivably escape a planet too large for chemical rockets?
Command to force hard drive arm to move to a specific position on the platter
Repeatable HTTP requests in Python
Distinguish starting journals from predatory ones
Stitch Together a Palindrome from Palindromic Substrings
Bertrand's Primes
What's new in higher dimensions?
Why was Bruce Wayne so harsh/rude when he asked for everyone to leave his party?
bed file with N regions of GRCh38 reference?
Who gets the interest on a 401(k) loan?
Are there any cemeteries in Westeros?
What are the smallest planes running scheduled flights in Europe?
Which number am I thinking of?
The non-compliance of the EU cookie law as a finding in a penetration test report?
Are new intel CPUs vulnerable to Meltdown/Spectre?
 question feed
UNIX & LINUX
Tour
Help
Chat
Contact
Feedback
Mobile
COMPANY
Stack Overflow
Stack Overflow Business
Developer Jobs
About
Press
Legal
Privacy Policy
STACK EXCHANGE NETWORK
Technology
Life / Arts
Culture / Recreation
Science
Other
Blog Facebook Twitter LinkedIn
site design / logo © 2018 Stack Exchange Inc; user contributions licensed under cc by-sa 3.0 with attribution required. rev 2018.2.13.28925

Linux is a registered trademark of Linus Torvalds. UNIX is a registered trademark of The Open Group. This site is not affiliated with Linus Torvalds or The Open Group in any way.
*/
