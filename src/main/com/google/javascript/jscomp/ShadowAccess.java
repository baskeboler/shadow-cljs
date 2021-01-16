package com.google.javascript.jscomp;

import com.google.javascript.rhino.Node;

import java.util.List;
import java.util.Set;

/**
 * Helper class to access package-protected things in custom CLJS compiler passes
 *
 * FIXME: PR to closure to get these public?
 */
public class ShadowAccess {
    public static Iterable<CompilerInput> getInputsInOrder(AbstractCompiler comp) {
        return comp.getInputsInOrder();
    }

    public static void reportChangeToEnclosingScope(AbstractCompiler comp, Node node) {
        comp.reportChangeToEnclosingScope(node);
    }

    public static JSModuleGraph getModuleGraph(AbstractCompiler compiler) {
        return compiler.getModuleGraph();
    }

    public static Node getJsRoot(AbstractCompiler compiler) {
        return compiler.getJsRoot();
    }

    public static Set<String> getExternProperties(AbstractCompiler compiler) {
        return compiler.getExternProperties();
    }

    // comp.toSource(node, source, first-input) is private for some reason
    // this does the exact same thing
    public static String nodeToJs(AbstractCompiler comp, SourceMap sourceMap, Node node) {
        CodePrinter.Builder builder = new CodePrinter.Builder(node);
        builder.setTypeRegistry(comp.getTypeRegistry());
        builder.setCompilerOptions(comp.getOptions());
        builder.setSourceMap(sourceMap);
        builder.setTagAsTypeSummary(false);
        // FIXME: should it?
        builder.setTagAsStrict(false);
        return builder.build();
    }

    public static void ensureLibraryInjected(AbstractCompiler comp, String name) {
        comp.ensureLibraryInjected(name, true);
    }

    // generate without source map info
    public static String nodeToJs(AbstractCompiler comp, Node node) {
        CodePrinter.Builder builder = new CodePrinter.Builder(node);
        builder.setTypeRegistry(comp.getTypeRegistry());
        builder.setCompilerOptions(comp.getOptions());
        builder.setTagAsTypeSummary(false);
        builder.setTagAsStrict(false);
        return builder.build();
    }

    // package-protected by default and not accessible in shadow.build.closure otherwise
    public static final DiagnosticType DUPLICATE_OBJECT_KEY = StrictModeCheck.DUPLICATE_OBJECT_KEY;
}
