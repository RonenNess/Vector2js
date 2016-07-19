"""
This script parse the javascript code and generate API docs from comments.
It will inject them into index.html
"""

# open code file for input
infile = open("vector2js.js")


def clean_line(line):
    return line.replace("//", "").replace("[", "").replace("]", "").strip()

# generate docs
docs_content = ""
for line in infile:

    # if starting of a line
    if "[API]" in line:

        # create box for current api doc
        curr = '''<div class="api-box">'''

        # prepare room for the title which we set lated
        curr += "<h3>.__TITLE__</h3>"

        # set tags
        tags = clean_line(next(infile)).split(", ")
        for tag in tags:
            if len(tag.strip()):
                curr += '''<span class="api-tag">[''' + tag + ''']</span>'''

        # build main text
        text = ""
        while True:

            # get next line and break if its @param or @return
            curr_line = clean_line(next(infile))
            if "@" in curr_line:
                break

            # add to api text
            text += curr_line.capitalize() + "<br />"

        # now add all the comment text we just built
        curr += "<p>" + text + "</p>"

        # check if param or return
        while True:

            # add return param
            if "@return" in curr_line:
                curr += "<p class='api-return'><b>Return:</b> " + curr_line.replace("@return ", "").title() + "</p>"
            elif "@param" in curr_line:
                curr += "<p class='api-param'>" + curr_line.replace("@param ", "<b>Param</b> ") + "</p>"

            # break if something else
            else:
                break

            # get next line
            curr_line = clean_line(next(infile))

        # scan until finding the function def
        while "function" not in curr_line:
            curr_line = clean_line(next(infile))

        # set title from function
        title = curr_line.replace(": function", "").replace("(", " (")
        curr = curr.replace("__TITLE__", title)

        # close and add to whole doc content
        curr += '''</div>'''
        docs_content += curr

# inject into html
with open("index.html", "r") as htmlfile:
    buff = htmlfile.read()


import re
buff = re.sub(r'(?s)(API PASTE HERE)(.*?)(END API PASTE)', r"\1  -->\r\n" + docs_content + r"\r\n\t\t<!-- \3", buff)

with open("index.html", "w") as htmlfile:
    htmlfile.write(buff)
