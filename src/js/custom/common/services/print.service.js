(function() {
    angular.module("app.common").factory("PrintService", printService);

    printService.$inject = ["$rootScope"];

    function printService($rootScope) {

        function closePrint() {
            document.body.removeChild(this.__container__);
        }

        function setPrint() {
            this.contentWindow.__container__ = this;
            this.contentWindow.onbeforeunload = closePrint;
            this.contentWindow.onafterprint = closePrint;
            this.contentWindow.focus(); // Required for IE
            this.contentWindow.print();
        }

        return {
            print: function(printableDiv) {

                var printContents = document.getElementById(printableDiv).innerHTML;
                var oHiddFrame = document.createElement("iframe");

                oHiddFrame.style.visibility = "hidden";
                oHiddFrame.style.position = "fixed";
                oHiddFrame.style.right = "0";
                oHiddFrame.style.bottom = "0";
                document.body.appendChild(oHiddFrame);
                oHiddFrame.onload = setPrint;

                var frameDoc = oHiddFrame.document;
                if (oHiddFrame.contentWindow)
                    frameDoc = oHiddFrame.contentWindow.document; // IE

                $.ajax({
                    url: "app/views/common/templates/print.container.tmpl.html",
                    success: function(result) {
                        if (!_.isNull(result) || !_.isUndefined(result)) {
                            var content = result.replace('@PrintContent', printContents);
                            // Write into iframe
                            frameDoc.open();
                            frameDoc.writeln(content);
                            frameDoc.close();
                        }
                    }
                });


            }
        };
    }
})();